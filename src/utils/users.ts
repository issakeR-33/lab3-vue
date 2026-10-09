import type { User } from '../types/user'

export type GenderFilter = 'all' | 'male' | 'female'
export type AgeFilter = 'all' | 'adult'
export type SortKey = 'none' | 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc'

export interface UserFilters {
  gender: GenderFilter
  age: AgeFilter
}

export const ADULT_AGE = 18

export function filterUsers(users: readonly User[], filters: UserFilters): User[] {
  return users.filter((user) => {
    const matchesGender = filters.gender === 'all' || user.gender === filters.gender
    const matchesAge = filters.age === 'all' || user.dob.age >= ADULT_AGE
    return matchesGender && matchesAge
  })
}

function compareNames(a: User, b: User): number {
  const byFirst = a.name.first.localeCompare(b.name.first, 'uk')
  return byFirst !== 0 ? byFirst : a.name.last.localeCompare(b.name.last, 'uk')
}

/** Повертає відсортовану копію; вхідний масив не змінюється, тому сортування не ламає фільтри. */
export function sortUsers(users: readonly User[], sort: SortKey): User[] {
  const copy = [...users]

  switch (sort) {
    case 'name-asc':
      return copy.sort(compareNames)
    case 'name-desc':
      return copy.sort((a, b) => compareNames(b, a))
    case 'age-asc':
      return copy.sort((a, b) => a.dob.age - b.dob.age)
    case 'age-desc':
      return copy.sort((a, b) => b.dob.age - a.dob.age)
    default:
      return copy
  }
}
