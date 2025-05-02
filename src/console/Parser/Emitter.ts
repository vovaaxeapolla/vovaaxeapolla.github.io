type Callback<T> = (...args: T[]) => void;

type CallbackWithOptions<T> = {
  callback: Callback<T>
  options: options
}

type options = {
  once: boolean
}

class Emitter {
  private readonly eventStore = new Map<string, Array<CallbackWithOptions<unknown>>>();

  public sub<T = unknown>(event: string, callback: Callback<T>, options = {} as options) {
    const arr = this.eventStore.get(event);

    if (arr && Array.isArray(arr)) {
      const callbackList: Array<CallbackWithOptions<unknown>> = arr;

      callbackList.push({ callback: callback as Callback<unknown>, options });
      this.eventStore.set(event, callbackList);
    } else { this.eventStore.set(event, [{ callback: callback as Callback<unknown>, options }]); }
  }

  public unsub<T = unknown>(event: string, callback: Callback<T>) {
    const arr = this.eventStore.get(event);

    if (arr && Array.isArray(arr)) {
      const callbackList = arr.filter((e: CallbackWithOptions<unknown>) => e.callback !== callback);

      this.eventStore.set(event, callbackList);
    }
  }

  public emit<T = unknown>(event: string, args: T[]) {
    const callbackList = this.eventStore.get(event);

    if (Array.isArray(callbackList)) {
      callbackList.forEach((e: CallbackWithOptions<unknown>) => {
        e.callback(...args);

        if (e.options.once) { this.unsub(event, e.callback); }
      });
    }
  }
}

export default new Emitter();
