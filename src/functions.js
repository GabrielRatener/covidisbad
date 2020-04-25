
const {max, min, round} = Math;

export const functions = {
  prev: {
    f: (item, index, series) => (index === 0) ? null : series[index - 1]
  },
  
  index: {
    f: (item, index) => index
  },

  series: {
    f: (item, index, series) => series
  },

  cumulative: {
    title: 'Total Cases',
    f: (item) => max(0, item.confirmed + item.recovered + item.deaths)
  },

  daily: {
    title: 'Daily Cases',
    f: (item) =>
      (item.prev === null)
      ? item.cumulative
      : item.cumulative - item.prev.cumulative
  },

  cumulativeLog: {
    title: 'Total Cases (log 10)',
    f: (item) => item.cumulative !== 0 ? Math.log10(item.cumulative) : 0
  },

  percentIncrease: {
    title: 'Daily Percent Change',
    f: (item) =>
      (item.prev && item.prev.cumulative > 0)
      ? 100 * item.daily / item.prev.cumulative
      : 0
  }
}

export const augmentedItem = (item, index, series) => {

  const augmented = {...item};

  Object.entries(functions)
    .forEach(([key, {f}]) => {
      Object.defineProperty(augmented, key, {
        get() {
          return f(augmented, index, series);
        }
      })
    });

  return augmented;
}