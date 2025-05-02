import { useEffect } from 'react';

import { debounce } from '@src/functions';

export default function useDebounce<A extends unknown[], R = void>(
  fn: (args: A) => R,
  ms: number
): ((args: A) => Promise<R>) {
  const [debouncedFun, teardown] = debounce<A, R>(fn, ms);

  useEffect(() => () => teardown(), []);

  return debouncedFun;
}
