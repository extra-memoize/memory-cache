import { describe, test, expect } from 'vitest'
import { Cache } from '@caches/cache.js'
import { State } from 'extra-memoize'

describe('Cache', () => {
  test('set', () => {
    const cache = new Cache()

    cache.set('key', 'value')

    expect(cache.get('key')).toStrictEqual([State.Hit, 'value'])
  })

  describe('get', () => {
    test('hit', () => {
      const cache = new Cache()
      cache.set('key', 'value')

      const result = cache.get('key')

      expect(result).toStrictEqual([State.Hit, 'value'])
    })

    test('miss', () => {
      const cache = new Cache()

      const result = cache.get('key')

      expect(result).toStrictEqual([State.Miss])
    })
  })

  describe('delete', () => {
    test('item exists', () => {
      const cache = new Cache()
      cache.set('key', 'value')

      cache.delete('key')

      expect(cache.get('key')).toStrictEqual([State.Miss])
    })

    test('item does not exist', () => {
      const cache = new Cache()

      cache.delete('key')

      expect(cache.get('key')).toStrictEqual([State.Miss])
    })
  })

  test('clear', () => {
    const cache = new Cache()
    cache.set('key', 'value')
    
    cache.clear()

    expect(cache.get('key')).toStrictEqual([State.Miss])
  })
})
