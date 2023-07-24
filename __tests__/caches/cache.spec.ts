import { Cache } from '@caches/cache'
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

  test('clear', () => {
    const cache = new Cache()
    cache.set('key', 'value')
    
    cache.clear()

    expect(cache.get('key')).toStrictEqual([State.Miss])
  })
})
