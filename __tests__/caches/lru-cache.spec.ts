import { LRUCache } from '@caches/lru-cache'
import { State } from 'extra-memoize'

describe('LRUCache', () => {
  test('LRU', () => {
    const cache = new LRUCache(2)

    cache.set('#1', 1) // cold [1] hot
    cache.set('#2', 2) // cold [1, 2] hot
    cache.get('#1') // cold [2, 1] hot
    cache.set('#3', 3) // cold [1, 3] hot

    expect(cache.get('#1')).toStrictEqual([State.Hit, 1])
    expect(cache.get('#2')).toStrictEqual([State.Miss])
    expect(cache.get('#3')).toStrictEqual([State.Hit, 3])
  })

  test('clear', () => {
    const cache = new LRUCache(999)
    cache.set('key', 'value')
    
    cache.clear()

    expect(cache.get('key')).toStrictEqual([State.Miss])
  })
})
