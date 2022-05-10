import { ExpirableCache } from '@caches/expirable-cache'
import { delay } from 'extra-promise'
import { State } from 'extra-memoize'

describe('ExpiralbeCache', () => {
  test('expirable', async () => {
    const map = new ExpirableCache(200)

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

  test('clear', () => {
    const cache = new ExpirableCache(999)
    cache.set('key', 'value')
    
    cache.clear()

    expect(cache.get('key')).toStrictEqual([State.Miss])
  })
})
