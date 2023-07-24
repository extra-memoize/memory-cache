# @extra-memoize/memory-cache
## Install
```sh
npm install --save @extra-memoize/memory-cache
# or
yarn add @extra-memoize/memory-cache
```

## API
### Cache
```ts
class Cache<T> implements ICache<T> {
  clear(): void
}
```

### LRUCache
```ts
class LRUCache<T> implements ICache<T> {
  constructor(limit: number)

  clear(): void
}
```

The classic LRU cache.

### ExpirableCache
```ts
class ExpirableCache<T> implements ICache<T> {
  constructor(timeToLive: number /*ms*/)

  clear(): void
}
```

The classisc expirable cache.

#### ExpirableCacheWithStaleWhileRevalidate
```ts
class ExpirableCacheWithStaleWhileRevalidate<T> implements IStaleWhileRevalidateCache<T> {
  constructor(timeToLive: number /*ms*/, staleWhileRevalidate: number /*ms*/)
}
```

#### ExpirableCacheWithStaleIfError
```ts
class ExpirableCacheWithStaleIfError<T> implements IStaleIfErrorCache<T> {
  constructor(timeToLive: number /*ms*/, staleIfError: number /*ms*/)
}
```

#### ExpirableCacheWithStaleWhileRevalidateAndStaleIfError
```ts
class ExpirableCacheWithStaleWhileRevalidateAndStaleIfError<T> implements IStaleWhileRevalidateAndStaleIfErrorCache<T> {
  constructor(
    timeToLive: number /*ms*/
  , staleWhileRevalidate: number /*ms*/
  , staleIfError: number /*ms*/
  )
}
```

### TLRUCache
```ts
class TLRUCache<T> implements ICache<T> {
  constructor(limit: number, timeToLive: number /*ms*/)

  clear(): void
}
```

The classic TLRU cache.

#### TLRUCacheWithStaleWhileRevalidate
```ts
class TLRUCacheWithStaleWhileRevalidate<T> implements IStaleWhileRevalidateCache<T> {
  constructor(limit: number, timeToLive: number /*ms*/, staleWhileRevalidate: number /*ms*/)
}
```

#### TLRUCacheWithStaleIfError
```ts
class TLRUCacheWithStaleIfError<T> implements IStaleIfErrorCache<T> {
  constructor(limit: number, timeToLive: number /*ms*/, staleIfError: number /*ms*/)
}
```

#### TLRUCacheWithStaleWhileRevalidateAndStaleIfError
```ts
class TLRUCacheWithStaleWhileRevalidateAndStaleIfError<T> implements IStaleWhileRevalidateAndStaleIfErrorCache<T> {
  constructor(
    limit: number
  , timeToLive: number /*ms*/
  , staleWhileRevalidate: number /*ms*/
  , staleIfError: number /*ms*/
  )
}
```
