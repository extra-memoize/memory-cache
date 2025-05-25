import { ExpirableCache } from './expirable-cache'
import { IStaleWhileRevalidateAndStaleIfErrorCache, State } from 'extra-memoize'

interface IRecord<T> {
  updatedAt: number
  value: T
}

export class ExpirableCacheWithStaleWhileRevalidateAndStaleIfError<T> implements IStaleWhileRevalidateAndStaleIfErrorCache<T> {
  private cache: ExpirableCache<IRecord<T>>

  constructor(
    private timeToLive: number
  , private staleWhileRevalidate: number
  , private staleIfError: number
  ) {
    this.cache = new ExpirableCache(timeToLive + staleWhileRevalidate + staleIfError)
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
      const timestamp = Date.now()
      if (record.updatedAt + this.timeToLive > timestamp) {
        return [State.Hit, record.value]
      } else if (record.updatedAt + this.timeToLive + this.staleWhileRevalidate > timestamp) {
        return [State.StaleWhileRevalidate, record.value]
      } else if (record.updatedAt + this.timeToLive + this.staleWhileRevalidate + this.staleIfError > timestamp) {
        return [State.StaleIfError, record.value]
      } else {
        // just in case
        return [State.Miss]
      }
    }
  }
}
