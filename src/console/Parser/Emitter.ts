type callback = {
  callback: Function
  options: options
}

type options = {
  once: boolean
}

class Emitter {
  private readonly eventStore = new Map<string, callback[]>();

  public sub(event: string, callback: Function, options = {} as options) {
    const arr = this.eventStore.get(event);

    if (arr && Array.isArray(arr)) {
      const callbackList: callback[] = arr;

      callbackList.push({ callback, options });
      this.eventStore.set(event, callbackList);
    } else { this.eventStore.set(event, [{ callback, options }]); }
  }

  public unsub(event: string, callback: Function) {
    const arr = this.eventStore.get(event);

    if (arr && Array.isArray(arr)) {
      const callbackList = arr.filter((e: callback) => e.callback !== callback);

      this.eventStore.set(event, callbackList);
    }
  }

  public emit(event: string, args: any[]) {
    const callbackList = this.eventStore.get(event);

    if (Array.isArray(callbackList)) {
      callbackList.forEach((e: callback) => {
        e.callback(...args);

        if (e.options.once) { this.unsub(event, e.callback); }
      });
    }
  }
}

export default new Emitter();
