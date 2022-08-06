import { ExpirableMap } from '@blackglory/structures'
import { ICache, State } from 'extra-memoize'

export class ExpirableCache<T> implements ICache<T> {
  private map: ExpirableMap<string, T>

  constructor(private timeToLive: number) {
    this.map = new ExpirableMap()
  }

  get(key: string): [State.Miss] | [State.Hit, T] {
    if (this.map.has(key)) {
      return [State.Hit, this.map.get(key)!]
    } else {
      return [State.Miss]
    }
  }

  set(key: string, value: T): void {
    this.map.set(key, value, this.timeToLive)
  }

  clear(): void {
    this.map.clear()
  }
}
