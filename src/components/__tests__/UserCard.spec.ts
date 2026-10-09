import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import usersData from '../../data/users.json'
import type { User } from '../../types/user'
import UserCard from '../UserCard.vue'

const users = usersData as User[]
const first = users[0] as User
const withAge = (age: number): User => ({ ...first, dob: { ...first.dob, age } })
const render = (user: User) => mount(UserCard, { props: { user } })
const AGE_CLASSES = ['minor', 'young', 'adult', 'senior']

describe('UserCard', () => {
  it.each([
    [17, 'minor'],
    [18, 'young'],
    [30, 'young'],
    [31, 'adult'],
    [50, 'adult'],
    [51, 'senior'],
  ])('uses the correct colour class for age %i', (age, expected) => {
    const classes = render(withAge(age)).get('.user-card').classes()

    expect(classes).toContain(expected)
    expect(classes.filter((name) => AGE_CLASSES.includes(name))).toHaveLength(1)
  })

  it('shows the age only for users older than 18', () => {
    expect(render(withAge(18)).text()).not.toContain('years')
    expect(render(withAge(19)).text()).toContain('19 years')
  })

  it('renders every hobby', () => {
    const wrapper = render(first)

    expect(wrapper.findAll('.hobbies__item')).toHaveLength(first.hobbies.length)
  })

  it('toggles the details block with v-show', async () => {
    // isVisible() працює лише для елемента, доданого в документ
    const wrapper = mount(UserCard, { props: { user: first }, attachTo: document.body })
    const details = wrapper.get('.about-text')

    expect(details.isVisible()).toBe(false)
    await wrapper.get('.about-toggle').trigger('click')
    expect(details.isVisible()).toBe(true)

    wrapper.unmount()
  })

  it('builds the alt text from the first and last name', () => {
    const wrapper = render(first)

    expect(wrapper.get('img').attributes('alt')).toBe(`${first.name.first} ${first.name.last}`)
  })
})
