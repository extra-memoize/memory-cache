import { TLRUCache } from './tlru-cache'
import { IStaleWhileRevalidateAndStaleIfErrorCache, State } from 'extra-memoize'

interface IRecord<T> {
  updatedAt: number
  value: T
}

export class TLRUCacheWithStaleWhileRevalidateAndStaleIfError<T> implements IStaleWhileRevalidateAndStaleIfErrorCache<T> {
  private cache: TLRUCache<IRecord<T>>

  constructor(
    limit: number
  , private timeToLive: number
  , private staleWhileRevalidate: number
  , private staleIfError: number
  ) {
    this.cache = new TLRUCache(limit, timeToLive + staleWhileRevalidate + staleIfError)
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      value
    , updatedAt: Date.now()
    })
  }

  get(key: string): [State.Miss]
                  | [
                    | State.Hit
                    | State.StaleWhileRevalidate
                    | State.StaleIfError
                    , T
                    ] {
    const [state, record] = this.cache.get(key)
    if (state === State.Miss) {
      return [State.Miss]
    } else {
      const elapsed = Date.now() - record.updatedAt
      if (elapsed <= this.timeToLive) {
        return [State.Hit, record.value]
      } else if (elapsed <= this.timeToLive + this.staleWhileRevalidate) {
        return [State.StaleWhileRevalidate, record.value]
      } else if (elapsed <= this.timeToLive + this.staleWhileRevalidate + this.staleIfError) {
        return [State.StaleIfError, record.value]
      } else {
        // just in case
        return [State.Miss]
      }
    }
  }
}
