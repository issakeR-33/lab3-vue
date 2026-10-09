<script setup lang="ts">
import type { AgeFilter, GenderFilter, SortKey } from '../utils/users'

const gender = defineModel<GenderFilter>('gender', { required: true })
const age = defineModel<AgeFilter>('age', { required: true })
const sort = defineModel<SortKey>('sort', { required: true })

defineEmits<{ reset: [] }>()

const genderOptions: { value: GenderFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'male', label: 'Чоловіки' },
  { value: 'female', label: 'Жінки' },
]

const ageOptions: { value: AgeFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'adult', label: '18 +' },
]

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'name-asc', label: 'Ім’я ↑' },
  { value: 'name-desc', label: 'Ім’я ↓' },
  { value: 'age-asc', label: 'Вік ↑' },
  { value: 'age-desc', label: 'Вік ↓' },
]
</script>

<template>
  <div class="toolbar">
    <div class="toolbar__group">
      <span class="toolbar__label">Стать</span>
      <button
        v-for="option in genderOptions"
        :key="option.value"
        type="button"
        class="toolbar__button"
        :class="{ 'toolbar__button--active': gender === option.value }"
        :aria-pressed="gender === option.value"
        @click="gender = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="toolbar__group">
      <span class="toolbar__label">Вік</span>
      <button
        v-for="option in ageOptions"
        :key="option.value"
        type="button"
        class="toolbar__button"
        :class="{ 'toolbar__button--active': age === option.value }"
        :aria-pressed="age === option.value"
        @click="age = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="toolbar__group">
      <span class="toolbar__label">Сортування</span>
      <button
        v-for="option in sortOptions"
        :key="option.value"
        type="button"
        class="toolbar__button"
        :class="{ 'toolbar__button--active': sort === option.value }"
        :aria-pressed="sort === option.value"
        @click="sort = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <button type="button" class="toolbar__button toolbar__button--reset" @click="$emit('reset')">
      Очистити все
    </button>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.toolbar__group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.toolbar__label {
  margin-right: 0.25rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.toolbar__button {
  padding: 0.35rem 0.8rem;
  font: inherit;
  font-size: 0.9rem;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
}

.toolbar__button:hover {
  border-color: var(--color-accent);
}

.toolbar__button--active {
  color: #fff;
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.toolbar__button--reset {
  margin-left: auto;
  color: #c92a2a;
  border-color: #f1b8b8;
}
</style>
