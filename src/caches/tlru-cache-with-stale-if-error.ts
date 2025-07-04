import { TLRUCache } from './tlru-cache.js'
import { IStaleIfErrorCache, State } from 'extra-memoize'

interface IRecord<T> {
  updatedAt: number
  value: T
}

export class TLRUCacheWithStaleIfError<T> implements IStaleIfErrorCache<T> {
  private cache: TLRUCache<IRecord<T>>

  constructor(
    limit: number
  , private timeToLive: number
  , private staleIfError: number
  ) {
    this.cache = new TLRUCache(limit, timeToLive + staleIfError)
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      value
    , updatedAt: Date.now()
    })
  }

  get(key: string): [State.Miss] | [State.Hit | State.StaleIfError, T] {
    const [state, record] = this.cache.get(key)
    if (state === State.Miss) {
      return [State.Miss]
    } else {
      const timestamp = Date.now()
      if (record.updatedAt + this.timeToLive > timestamp) {
        return [State.Hit, record.value]
      } else if (record.updatedAt + this.timeToLive + this.staleIfError > timestamp) {
        return [State.StaleIfError, record.value]
      } else {
        // just in case
        return [State.Miss]
      }
    }
  }
}
