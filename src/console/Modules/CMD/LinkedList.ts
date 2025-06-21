export default class LinkedList<T> {
  value: T;
  next: LinkedList<T> | null;

  constructor(value?: T, next?: LinkedList<T> | null) {
    this.value = value as T;
    this.next = next ?? null;
  }

  static fromArray<T>(array: T[]): LinkedList<T> | null {
    if (array.length === 0) return null;

    const head = new LinkedList<T>(array[0]);
    let current = head;

    for (let i = 1; i < array.length; i++) {
      current.next = new LinkedList<T>(array[i]);
      current = current.next;
    }

    return head;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let current: LinkedList<T> | null = this;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  toString(): string {
    const values: T[] = [];
    let current: LinkedList<T> | null = this;

    while (current) {
      values.push(current.value);
      current = current.next;
    }

    return `Linked list: ${values.join(' -> ')}`;
  }
}