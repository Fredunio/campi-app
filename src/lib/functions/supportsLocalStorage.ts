export function supportsLocalStorage() {
  return typeof globalThis.localStorage !== "undefined";
}
