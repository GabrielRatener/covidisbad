
import {augmentedItem} from "./functions"

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

export const loadCountrySeries = async function*(startingWith = '') {
  const countries = await getCountries();

  for (const code in countries) {
    const {flag, title} = countries[code];
    const basicSeries = await getCountrySeries(code);

    if (title.toLowerCase().startsWith(startingWith)) {
      const series = [];
      let i = 0;

      for (const item of basicSeries) {
        series.push(augmentedItem(item, i, series));
        i++;
      }

      yield {
        code,
        flag,
        title,
        series
      }
    }
  }
}

export const chunk = (array, n = 3) => {
  const chunked = [];

  for (let i = 0; i < array.length; i += n) {
    
    const slice = array.slice(i, i + n);

    if (slice.length > 0) {
      
      chunked.push(slice);
    }
  }
    
  return chunked;
}
