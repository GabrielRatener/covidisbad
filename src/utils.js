
export const setTimeout = (ms, fn) => window.setTimeout(fn, ms);
export const setInterval = (ms, fn) => window.setInterval(fn, ms);
export const clear = (handle) =>  {
  clearInterval(handle);
  clearTimeout(handle);
}
