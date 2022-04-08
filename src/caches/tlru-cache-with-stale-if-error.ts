import { TLRUCache } from './tlru-cache'
import { IStaleIfErrorCache, State } from 'extra-memoize'
import { isUndefined } from '@blackglory/prelude'

interface IRecord<T> {
  updatedAt: number
  value: T
}

export class TLRUCacheWithStaleIfError<T = any> implements IStaleIfErrorCache<T> {
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

  get(key: string): [State.Miss, undefined] | [State.Hit | State.StaleIfError, T] {
    const record = this.cache.get(key)
    if (isUndefined(record)) return [State.Miss, undefined]

    const elapsed = Date.now() - record.updatedAt
    if (elapsed <= this.timeToLive) {
      return [State.Hit, record.value]
    } else if (elapsed <= this.timeToLive + this.staleIfError) {
      return [State.StaleIfError, record.value]
    } else {
      // just in case
      return [State.Miss, undefined]
    }
  }
}
