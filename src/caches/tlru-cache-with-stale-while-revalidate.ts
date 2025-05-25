import { TLRUCache } from './tlru-cache'
import { IStaleWhileRevalidateCache, State } from 'extra-memoize'

interface IRecord<T> {
  updatedAt: number
  value: T
}

export class TLRUCacheWithStaleWhileRevalidate<T> implements IStaleWhileRevalidateCache<T> {
  private cache: TLRUCache<IRecord<T>>

  constructor(
    limit: number
  , private timeToLive: number
  , private staleWhileRevalidate: number
  ) {
    this.cache = new TLRUCache(limit, timeToLive + staleWhileRevalidate)
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      value
    , updatedAt: Date.now()
    })
  }

  get(key: string): [State.Miss] | [State.Hit | State.StaleWhileRevalidate, T] {
    const [state, record] = this.cache.get(key)
    if (state === State.Miss) {
      return [State.Miss]
    } else {
      if (this.isStaleWhileRevalidate(record)) {
        return [State.StaleWhileRevalidate, record.value]
      } else {
        return [State.Hit, record.value]
      }
    }
  }

  isStaleWhileRevalidate(record: IRecord<T>): boolean {
    const timestamp = Date.now()
    return timestamp - record.updatedAt > this.timeToLive
        && timestamp - record.updatedAt <= this.timeToLive + this.staleWhileRevalidate
  }
}
