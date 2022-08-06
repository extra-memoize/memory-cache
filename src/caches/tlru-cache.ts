import { TLRUMap } from '@blackglory/structures'
import { ICache, State } from 'extra-memoize'

export class TLRUCache<T> implements ICache<T> {
  private map: TLRUMap<string, T> 

  constructor(limit: number, private timeToLive: number) {
    this.map = new TLRUMap(limit)
  }

  set(key: string, value: T): void {
    this.map.set(key, value, this.timeToLive)
  }

  get(key: string): [State.Miss] | [State.Hit, T] {
    if (this.map.has(key)) {
      return [State.Hit, this.map.get(key)!]
    } else {
      return [State.Miss]
    }
  }

  clear(): void {
    this.map.clear()
  }
}
