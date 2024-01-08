import Emitter from '@console/Parser/Emitter';

export default function asyncInput<T>(): Promise<T> {
  return new Promise((resolve) => {
    const temp = (value: T) => {
      resolve(value);
    };

    Emitter.sub('input', temp, { once: true });
  });
}
