export type Listener<T> = (value: T) => void;

export class Observable<T> {
  private readonly listeners = new Set<Listener<T>>();

  constructor(private value: T) {}

  get(): T {
    return this.value;
  }

  set(next: T): void {
    this.value = next;
    this.listeners.forEach((listener) => listener(next));
  }

  update(fn: (current: T) => T): void {
    this.set(fn(this.value));
  }

  /** Calls the listener immediately, then on every change. Returns an unsubscribe fn. */
  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    listener(this.value);
    return () => this.listeners.delete(listener);
  }
}
