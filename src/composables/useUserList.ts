import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { User } from '../types/user'
import { filterUsers, sortUsers } from '../utils/users'
import type { AgeFilter, GenderFilter, SortKey } from '../utils/users'

/** Стан фільтрів і сортування списку користувачів. */
export function useUserList(users: Ref<User[]>) {
  const gender = ref<GenderFilter>('all')
  const age = ref<AgeFilter>('all')
  const sort = ref<SortKey>('none')

  // Спочатку фільтруємо, потім сортуємо: сортування не скидає фільтри
  const visibleUsers = computed(() =>
    sortUsers(filterUsers(users.value, { gender: gender.value, age: age.value }), sort.value),
  )

  function reset(): void {
    gender.value = 'all'
    age.value = 'all'
    sort.value = 'none'
  }

  return { gender, age, sort, visibleUsers, reset }
}
