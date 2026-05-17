export async function register() {
  // Node 25 ships a built-in localStorage global, but without --localstorage-file
  // pointing at a real path the object exists with non-function methods, crashing SSR.
  // Patch it to a silent no-op so server rendering never blows up.
  if (
    typeof globalThis.localStorage !== 'undefined' &&
    typeof (globalThis.localStorage as Storage).getItem !== 'function'
  ) {
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      },
      writable: true,
      configurable: true,
    })
  }
  if (
    typeof globalThis.sessionStorage !== 'undefined' &&
    typeof (globalThis.sessionStorage as Storage).getItem !== 'function'
  ) {
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      },
      writable: true,
      configurable: true,
    })
  }
}
