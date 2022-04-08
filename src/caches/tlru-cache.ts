import { TLRUMap } from '@blackglory/structures'
import { ICache } from 'extra-memoize'

export class TLRUCache<T = any> implements ICache<T> {
  private map: TLRUMap<string, T> 

  constructor(limit: number, private timeToLive: number) {
    this.map = new TLRUMap(limit)
  }

  set(key: string, value: T): void {
    this.map.set(key, value, this.timeToLive)
  }

  get(key: string): T | undefined {
    return this.map.get(key)
  }

  clear(): void {
    this.map.clear()
  }
}
