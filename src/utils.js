
export const setTimeout = (ms, fn) => window.setTimeout(fn, ms);
export const setInterval = (ms, fn) => window.setInterval(fn, ms);
export const clear = (handle) =>  {
  clearInterval(handle);
  clearTimeout(handle);
}

export const sigdig = (n, value) => {
  // TDOO
}

export const round = (n, value) => {
  
  const factor = 10 ** n;

  return Math.round(factor * value) / factor;
}
