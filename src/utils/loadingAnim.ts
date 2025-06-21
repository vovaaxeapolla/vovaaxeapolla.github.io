export function loadingAnim(array: unknown[], callback: Function, options?: object) {
  const delay = 500 / array.length;

  array.forEach((element, i) => {
    setTimeout(() => callback(element), i * delay + Math.random() * delay);
  });
}
