<script setup lang="ts">
import { toRef } from 'vue'
import usersData from '../data/users.json'
import { useUserList } from '../composables/useUserList'
import type { User } from '../types/user'
import UserCard from './UserCard.vue'
import UsersToolbar from './UsersToolbar.vue'

const props = withDefaults(defineProps<{ users?: User[] }>(), {
  users: () => usersData as User[],
})

const { gender, age, sort, visibleUsers, reset } = useUserList(toRef(props, 'users'))
</script>

<template>
  <section class="users">
    <h1 class="users__title">Користувачі</h1>

    <UsersToolbar v-model:gender="gender" v-model:age="age" v-model:sort="sort" @reset="reset" />

    <ul v-if="visibleUsers.length > 0" class="users__list">
      <li v-for="user in visibleUsers" :key="user.id">
        <UserCard :user="user" />
      </li>
    </ul>
    <p v-else class="users__empty">Список юзерів пустий</p>
  </section>
</template>

<style scoped>
.users__title {
  margin: 0 0 1.25rem;
  font-size: 1.8rem;
}

.users__list {
  display: grid;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.users__empty {
  padding: 2rem;
  text-align: center;
  color: var(--color-muted);
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: 12px;
}
</style>
