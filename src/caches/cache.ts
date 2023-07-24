import { ICache, State } from 'extra-memoize'

export class Cache<T> implements ICache<T> {
  private map = new Map()

  set(key: string, value: T): void {
    this.map.set(key, value)
  }

  get(key: string): [State.Miss] | [State.Hit, T] {
    if (this.map.has(key)) {
      return [State.Hit, this.map.get(key)]
    } else {
      return [State.Miss]
    }
  }

  clear(): void {
    this.map.clear()
  }
}
