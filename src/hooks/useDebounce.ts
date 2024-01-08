import { debounce } from "@src/functions";
import { useEffect } from "react";

export default function useDebounce<A extends any[], R = void>(
    fn: (args: A) => R,
    ms: number
): ((args: A) => Promise<R>) {
    const [debouncedFun, teardown] = debounce<A, R>(fn, ms);

    useEffect(() => () => teardown(), []);

    return debouncedFun;
};