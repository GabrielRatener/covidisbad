
import fs from "fs"

import jolt from "jolt.sh"
import {compose} from "jeremy-json"

const GITHUB_URL = "https://raw.githubusercontent.com";
const COUNTRY_URL = `${GITHUB_URL}/pomber/covid19/master/docs/countries.json`;
const SERIES_URL = `${GITHUB_URL}/pomber/covid19/master/docs/timeseries.json`;

const $ = jolt.createRunner();

const makeDir = (dir) => {
  try {
    $`mkdir ${dir}`;
  } catch (e) {
    // it's ok...
  }
}

const loadUrl = (url) => {
  const $ = jolt.createSpawnRunner();

  return compose(async (add, done) => {

    for await (const {type, text} of $`curl ${url}`) {

      if (type === 'stdout') {
        for (let i = 0; i < text.length; i++) {
          add(text[i]);
        }
      }
    }

    done();
  });
}

const loadData = async () => {

  const countries = await loadUrl(COUNTRY_URL).value();
  const timeseries = await loadUrl(SERIES_URL);

  const index = {}

  makeDir('public/countries');

  for await (const [title, series] of timeseries.iterate()) {
    if (countries.hasOwnProperty(title) && countries[title].code !== undefined) {
      const {code, flag} = countries[title];
      const id = code.toLowerCase();

      console.log(`Loading ${title}...`);

      index[id] = {code, flag, title};

      fs.writeFileSync(`public/countries/${id}.json`,
        JSON.stringify(series, null, 2));
    }
  }

  fs.writeFileSync(`public/countries/index.json`, JSON.stringify(index, null, 2));
}

const serveSecure = (port) => {
  $`http-server -p ${port} -S -C ssl/cert.pem -K ssl/key.pem`;
}

const serve = (port) => {
  $`http-server -p ${port}`;
}

const copy = (production = false) => {
  const ns = production ? 'production.min' : 'development';
  const ext = production ? 'min.js' : 'js';

  console.log('Creating public/dist directory...');

  makeDir('public/dist');

  console.log('Copying dependencies...');

  $`cp node_modules/react/umd/react.${ns}.js public/dist/react.js`;
  $`cp node_modules/react-dom/umd/react-dom.${ns}.js public/dist/react-dom.js`;
  $`cp node_modules/react-is/umd/react-is.${ns}.js public/dist/react-is.js`;
  $`cp node_modules/prop-types/prop-types.${ext} public/dist/prop-types.js`;
  $`cp node_modules/recharts/umd/Recharts.${ext} public/dist/recharts.js`;
  $`cp node_modules/bootstrap/dist/css/bootstrap.min.css public/dist/bootstrap.css`;

  console.log('Done copying!');
}

const postinstall = async () => {
  copy();
  rollup();
  await loadData();

  console.log("\nNow run `npm start` to start your local server!\n");
}

const rollup = (watch = false) => {

  if (watch) {
    $`rollup -c -w`;
  } else {
    $`rollup -c`;
  }
}

const main = async (script, args = []) => {
  
  switch (script) {
    case 'build':
    case 'rollup':
      rollup(args.length > 0 && args[0] === 'watch');
      return;

    case 'data':
      await loadData();
      return;
    
    // same for now...
    case 'copy':
      copy();
      return;

    case 'postinstall':
      await postinstall();
      return;

    case 'serve':
      serve(args.length > 0 ? parseInt(args[0]) : 8080);
      return;

    case 'serve:secure':
      serveSecure(args.length > 0 ? parseInt(args[0]) : 443);
      return;

    default:
      console.error(`Invalid script "${script}"`);
      console.error(`Exiting...`);
      return;
  }
}

if (process.argv.length > 2) {
  const [script, ...args] = process.argv.slice(2);

  main(script, args);
} else {

  // default
  main('serve', []);
}
