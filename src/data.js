
export const load = (resource, json = true) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Response ${xhr.status}`));
        }
      }
    }

    if (json) {
      xhr.responseType = 'json';
    }

    xhr.open('GET', resource);
    xhr.send();
  });
}

export const getCountries = () => {
  return load('countries/index.json');
}

export const getCountrySeries = (code) => {
  return load(`countries/${code}.json`);
}

export const loadCountrySeries = async function*() {
  const countries = await getCountries();

  for (const code in countries) {
    const {flag, title} = countries[code];
    const series = await getCountrySeries(code);

    yield {code, flag, title, series};
  }
}
