(function (ReactDOM, React, recharts) {
  'use strict';

  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;
  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;

  const isObject = (candidate) => {

    return candidate !== null && typeof candidate === 'object';
  };

  const parseShorthand = (shorthand) => {
    const collect = () => {

      if (str.length > 0) {
        switch (mode) {
          case 0:
            tuple.tag = str;
            break;
          case 1:
            tuple.id = str;
            break;
          case 2:
            tuple.classes.push(str);
            break;
        }
      }

      str = '';
    };

    const tuple = {
      tag: 'div',
      id: null,
      classes: []
    };

    let mode = 0;
    let str = '';

    for (const c of shorthand) {
      
      switch (c) {
        case '#':
          collect();
          mode = 1;
          break;

        case '.':
          collect();
          mode = 2;
          break;

        default:
          str += c;
      }
    }

    collect();

    return tuple;
  };

  const getClassList = (attributes) => {
    if (attributes) {
      if (Array.isArray(attributes)) {
        return [];
      } else {
        if (!attributes.hasOwnProperty('class')) {
          if (Array.isArray(attributes.class)) {
            return attributes.class;
          }

          if (typeof attributes.class === 'string') {
            return attributes.class
              .split(/\s+/g)
              .filter((s) => s.length > 0);
          }

          if (isObject(attributes.class)) {
            return Object.entries(attributes.class)
              .filter(([, value]) => !!value)
              .map(([key]) => key);
          }

        } else {
          return [];
        }
      }
    
    }

    return [];
  };

  const integrateClassSets = (fixedList, addedClassList) => {
    const fixedSet = new Set(fixedList);

    return [
      ...fixedSet,
      ...addedClassList.filter((className) => !fixedSet.has(className))
    ]
  };

  const el = (target, id, attributes, children) => {

    const {class: className, ...other} = attributes;

    const newAttributes = {
      ...other,
      ...(!attributes.hasOwnProperty('class') ? {} : {
        className: className.join(' ')
      }),
      ...(id === null ? {} : {id})
    };

    return React.createElement(target, newAttributes, children);
  };

  const c = (component, shorthand = '', attributes = {}, children = []) => {
    
    if (typeof shorthand !== 'string') {

      return c(component, '', shorthand,
        Array.isArray(attributes) ? attributes : []);
    } else if (Array.isArray(attributes)) {
      
      return c(component, shorthand, {}, attributes);
    } else {

      const {id, classes} = parseShorthand(shorthand);
      const customClasses = getClassList(attributes);
      const augmentedAttributes = {
        ...attributes,
        class: integrateClassSets(classes, customClasses),
      };

      return el(component, id, augmentedAttributes, children);
    }
  };

  const t = (shorthand, attributes = {}, children = []) => {

    if (Array.isArray(attributes)) {
      
      return t(shorthand, {}, attributes);
    } else {

      const {tag, id, classes} = parseShorthand(shorthand);
      const customClasses = getClassList(attributes);
      const augmentedAttributes = {
        ...attributes,
        class: integrateClassSets(classes, customClasses),
      };

      return el(tag, id, augmentedAttributes, children);
    }
  };

  const e = (lead, ...args) => {

    if (typeof lead === 'string') {
      return t(lead, ...args);
    } else {
      return c(lead, ...args);
    }
  };

  const load = (resource, json = true) => {
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
      };

      if (json) {
        xhr.responseType = 'json';
      }

      xhr.open('GET', resource);
      xhr.send();
    });
  };

  const getCountries = () => {
    return load('countries/index.json');
  };

  const getCountrySeries = (code) => {
    return load(`countries/${code}.json`);
  };

  const loadCountrySeries = async function*() {
    const countries = await getCountries();

    for (const code in countries) {
      const {flag, title} = countries[code];
      const series = await getCountrySeries(code);

      yield {code, flag, title, series};
    }
  };

  var App, fn;

  fn = (item, index, series) => {
    return index;
  };

  var App$1 = App = class App extends React.Component {
    constructor() {
      super();
      this.state = {
        color: '#eee',
        countries: []
      };
    }

    async componentDidMount() {
      var dataset, ref;
      ref = loadCountrySeries();
      for await (dataset of ref) {
        this.setState({
          countries: [...this.state.countries, dataset]
        });
      }
      return 0;
    }

    render() {
      return e('#app', [
        ...this.state.countries.map((country) => {
          console.log(country.code);
          return e(recharts.LineChart,
        {
            key: country.code,
            width: 500,
            height: 300,
            data: country.series.map((point,
        i) => {
              return {
                name: point.date,
                value: fn(point,
        i,
        country.series)
              };
            })
          },
        [
            e(recharts.XAxis,
            {
              dataKey: 'name'
            }),
            e(recharts.YAxis),
            e(recharts.CartesianGrid,
            {
              strokeDasharray: '5 5',
              stroke: this.state.color
            }),
            e(recharts.Line,
            {
              type: 'monotone',
              dataKey: 'value',
              stroke: this.state.color
            })
          ]);
        })
      ]);
    }

  };

  window.onload = () => {

    ReactDOM.render(e(App$1), document.getElementById('app-mount'));
  };

}(ReactDOM, React, Recharts));
