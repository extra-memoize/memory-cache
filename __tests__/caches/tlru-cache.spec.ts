import { describe, test, expect } from 'vitest'
import { TLRUCache } from '@caches/tlru-cache.js'
import { delay } from 'extra-promise'
import { State } from 'extra-memoize'

describe('TLRUCache', () => {
  test('maxAge', async () => {
    const map = new TLRUCache(999, 200)

    map.set('#1',1) // #1 0
    await delay(100) // #1 100
    expect(map.get('#1')).toStrictEqual([State.Hit, 1])

    map.set('#2',2) // #1 100, #2 0
    expect(map.get('#1')).toStrictEqual([State.Hit, 1])
    expect(map.get('#2')).toStrictEqual([State.Hit, 2])

    await delay(101) // #1 201, #2 101
    expect(map.get('#1')).toStrictEqual([State.Miss])
    expect(map.get('#2')).toStrictEqual([State.Hit, 2])
  })

  test('limit', () => {
    const cache = new TLRUCache(2, 999)

    cache.set('#1', 1) // cold [1] hot
    cache.set('#2', 2) // cold [1, 2] hot
    cache.get('#1') // cold [2, 1] hot
    cache.set('#3', 3) // cold [1, 3] hot

    expect(cache.get('#1')).toStrictEqual([State.Hit, 1])
    expect(cache.get('#2')).toStrictEqual([State.Miss])
    expect(cache.get('#3')).toStrictEqual([State.Hit, 3])
  })

  test('clear', () => {
    const cache = new TLRUCache(999, 999)
    cache.set('key', 'value')
    
    cache.clear()

    expect(cache.get('key')).toStrictEqual([State.Miss])
  })
})
