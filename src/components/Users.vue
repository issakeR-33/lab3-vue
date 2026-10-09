<script setup lang="ts">
import { computed, ref } from 'vue'
import userData from '../data/user.json'
import type { User } from '../types/user'

const user = userData as User

const isDetailsVisible = ref(false)

const fullName = computed(() => `${user.name.title}. ${user.name.first} ${user.name.last}`)
const gender = computed(() => (user.gender === 'female' ? 'Female' : 'Male'))
const birthDate = computed(() => new Date(user.dob.date).toLocaleDateString('uk-UA'))
const shortAddress = computed(
  () => `${user.location.city}, ${user.location.state}, ${user.location.country}`,
)

const age = computed(() => user.dob.age)
// Колір картки залежить від віку: до 18, 18–30, 31–50, понад 50
const ageClasses = computed(() => ({
  minor: age.value < 18,
  young: age.value >= 18 && age.value <= 30,
  adult: age.value >= 31 && age.value <= 50,
  senior: age.value > 50,
}))
</script>

<template>
  <article class="user-card" :class="ageClasses">
    <aside class="user-card__side">
      <img
        class="user-card__photo"
        :src="user.picture"
        :alt="`${user.name.first} ${user.name.last}`"
      />
      <h2 class="user-card__name">{{ fullName }}</h2>
      <p class="user-card__meta">
        {{ gender }}
        <span v-if="age > 18"> · {{ age }} years</span>
      </p>

      <ul class="user-card__contacts">
        <li>{{ shortAddress }}</li>
        <li>{{ user.email }}</li>
        <li>{{ user.phone }}</li>
        <li>{{ user.cell }}</li>
      </ul>
    </aside>

    <section class="user-card__main">
      <button
        class="about-toggle"
        type="button"
        :aria-expanded="isDetailsVisible"
        @click="isDetailsVisible = !isDetailsVisible"
      >
        <span>About me</span>
        <span
          class="about-toggle__arrow"
          :class="{ 'about-toggle__arrow--open': isDetailsVisible }"
        >
          ▾
        </span>
      </button>
      <p v-show="isDetailsVisible" class="about-text">{{ user.details }}</p>

      <div class="info-block">
        <h3 class="info-block__title">Personal Information</h3>
        <dl class="info-list">
          <dt>Full name</dt>
          <dd>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</dd>
          <dt>Gender</dt>
          <dd>{{ gender }}</dd>
          <dt>Date of birth</dt>
          <dd>
            {{ birthDate }}
            <span v-if="age > 18">(age {{ age }})</span>
          </dd>
          <dt>Email</dt>
          <dd>{{ user.email }}</dd>
          <dt>Phone</dt>
          <dd>{{ user.phone }}</dd>
          <dt>Cell</dt>
          <dd>{{ user.cell }}</dd>
        </dl>
      </div>

      <div class="info-block">
        <h3 class="info-block__title">Location</h3>
        <dl class="info-list">
          <dt>Street</dt>
          <dd>{{ user.location.street.number }} {{ user.location.street.name }}</dd>
          <dt>City</dt>
          <dd>{{ user.location.city }}</dd>
          <dt>State</dt>
          <dd>{{ user.location.state }}</dd>
          <dt>Country</dt>
          <dd>{{ user.location.country }}</dd>
          <dt>Postcode</dt>
          <dd>{{ user.location.postcode }}</dd>
          <dt>Timezone</dt>
          <dd>{{ user.location.timezone.offset }} ({{ user.location.timezone.description }})</dd>
        </dl>
      </div>

      <div class="info-block">
        <h3 class="info-block__title">Hobbies</h3>
        <ul class="hobbies">
          <li v-for="hobby in user.hobbies" :key="hobby" class="hobbies__item">
            {{ hobby }}
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<style scoped>
.user-card {
  --card-accent: var(--color-accent);

  display: grid;
  grid-template-columns: minmax(240px, 1fr) 2fr;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 6px solid var(--card-accent);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgb(31 42 68 / 6%);
}

/* Кольори за віком */
.user-card.minor {
  --card-accent: #e8590c;
  background: #fff6ef;
}

.user-card.young {
  --card-accent: #2f9e44;
  background: #f2fbf4;
}

.user-card.adult {
  --card-accent: #3b6fe0;
  background: #f3f7ff;
}

.user-card.senior {
  --card-accent: #7048e8;
  background: #f7f3ff;
}

.user-card__photo {
  display: block;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 12px;
}

.user-card__name {
  margin: 1rem 0 0.25rem;
  font-size: 1.6rem;
}

.user-card__meta {
  margin: 0 0 1rem;
  color: var(--color-muted);
}

.user-card__contacts {
  margin: 0;
  padding: 1rem 0 0;
  list-style: none;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
}

.user-card__contacts li + li {
  margin-top: 0.4rem;
}

.about-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  font: inherit;
  font-weight: 600;
  color: inherit;
  background: rgb(255 255 255 / 70%);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
}

.about-toggle__arrow {
  transition: transform 0.2s;
}

.about-toggle__arrow--open {
  transform: rotate(180deg);
}

.about-text {
  margin: 0.75rem 0 0;
  padding: 0 0.25rem;
  color: var(--color-muted);
}

.info-block {
  margin-top: 1rem;
  padding: 1rem 1.25rem;
  background: rgb(255 255 255 / 70%);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.info-block__title {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
}

.info-list {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 0.35rem 1rem;
  margin: 0;
}

.info-list dt {
  color: var(--color-muted);
}

.info-list dd {
  margin: 0;
}

.hobbies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.hobbies__item {
  padding: 0.25rem 0.75rem;
  font-size: 0.9rem;
  color: var(--card-accent);
  background: rgb(255 255 255 / 80%);
  border: 1px solid var(--card-accent);
  border-radius: 999px;
}

@media (max-width: 720px) {
  .user-card {
    grid-template-columns: 1fr;
  }
}
</style>
