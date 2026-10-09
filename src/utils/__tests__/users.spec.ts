import { describe, expect, it } from 'vitest'
import usersData from '../../data/users.json'
import type { User } from '../../types/user'
import { filterUsers, sortUsers } from '../users'

const users = usersData as User[]
const ids = (list: User[]): number[] => list.map((user) => user.id)

describe('filterUsers', () => {
  it('returns everyone when no filters are active', () => {
    expect(filterUsers(users, { gender: 'all', age: 'all' })).toHaveLength(10)
  })

  it('filters by gender', () => {
    const men = filterUsers(users, { gender: 'male', age: 'all' })
    const women = filterUsers(users, { gender: 'female', age: 'all' })

    expect(men.every((user) => user.gender === 'male')).toBe(true)
    expect(women.every((user) => user.gender === 'female')).toBe(true)
    expect(men.length + women.length).toBe(users.length)
  })

  it('hides users younger than 18 when the age filter is on', () => {
    const adults = filterUsers(users, { gender: 'all', age: 'adult' })

    expect(adults.every((user) => user.dob.age >= 18)).toBe(true)
    expect(ids(adults)).not.toContain(3)
    expect(ids(adults)).not.toContain(6)
  })

  it('combines the gender and age filters', () => {
    const result = filterUsers(users, { gender: 'female', age: 'adult' })

    expect(result.every((user) => user.gender === 'female' && user.dob.age >= 18)).toBe(true)
  })
})

describe('sortUsers', () => {
  it('sorts by first name in both directions', () => {
    const asc = sortUsers(users, 'name-asc').map((user) => user.name.first)
    const desc = sortUsers(users, 'name-desc').map((user) => user.name.first)

    expect(asc).toEqual([...asc].sort((a, b) => a.localeCompare(b, 'uk')))
    expect(desc).toEqual([...asc].reverse())
  })

  it('sorts by age in both directions', () => {
    const asc = sortUsers(users, 'age-asc').map((user) => user.dob.age)
    const desc = sortUsers(users, 'age-desc').map((user) => user.dob.age)

    expect(asc).toEqual([...asc].sort((a, b) => a - b))
    expect(desc).toEqual([...asc].reverse())
  })

  it('does not change the original array', () => {
    const before = ids(users)

    sortUsers(users, 'age-desc')

    expect(ids(users)).toEqual(before)
  })

  it('keeps the original order when no sorting is chosen', () => {
    expect(ids(sortUsers(users, 'none'))).toEqual(ids(users))
  })

  it('does not break filtering when applied to a filtered list', () => {
    const filtered = filterUsers(users, { gender: 'male', age: 'adult' })
    const sorted = sortUsers(filtered, 'age-desc')

    expect(ids(sorted).sort()).toEqual(ids(filtered).sort())
    expect(sorted.every((user) => user.gender === 'male' && user.dob.age >= 18)).toBe(true)
  })
})
