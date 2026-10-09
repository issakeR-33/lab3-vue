<script setup lang="ts">
import { computed } from 'vue'
import userData from '../data/user.json'
import type { User } from '../types/user'

const user = userData as User

const fullName = computed(() => `${user.name.title}. ${user.name.first} ${user.name.last}`)
const gender = computed(() => (user.gender === 'female' ? 'Female' : 'Male'))
const birthDate = computed(() => new Date(user.dob.date).toLocaleDateString('uk-UA'))
const shortAddress = computed(
  () => `${user.location.city}, ${user.location.state}, ${user.location.country}`,
)
</script>

<template>
  <article class="user-card">
    <aside class="user-card__side">
      <img
        class="user-card__photo"
        :src="user.picture"
        :alt="`${user.name.first} ${user.name.last}`"
      />
      <h2 class="user-card__name">{{ fullName }}</h2>
      <p class="user-card__meta">{{ gender }} · {{ user.dob.age }} years</p>

      <ul class="user-card__contacts">
        <li>{{ shortAddress }}</li>
        <li>{{ user.email }}</li>
        <li>{{ user.phone }}</li>
        <li>{{ user.cell }}</li>
      </ul>
    </aside>

    <section class="user-card__main">
      <div class="info-block">
        <h3 class="info-block__title">Personal Information</h3>
        <dl class="info-list">
          <dt>Full name</dt>
          <dd>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</dd>
          <dt>Gender</dt>
          <dd>{{ gender }}</dd>
          <dt>Date of birth</dt>
          <dd>{{ birthDate }} (age {{ user.dob.age }})</dd>
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
    </section>
  </article>
</template>

<style scoped>
.user-card {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 2fr;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgb(31 42 68 / 6%);
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

.info-block {
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.info-block + .info-block {
  margin-top: 1rem;
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

@media (max-width: 720px) {
  .user-card {
    grid-template-columns: 1fr;
  }
}
</style>
