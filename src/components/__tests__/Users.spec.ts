import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UserCard from '../UserCard.vue'
import Users from '../Users.vue'

type Wrapper = ReturnType<typeof mount>

function buttonByText(wrapper: Wrapper, text: string) {
  const button = wrapper.findAll('button').find((item) => item.text() === text)
  if (!button) {
    throw new Error(`Кнопку "${text}" не знайдено`)
  }
  return button
}

const names = (wrapper: Wrapper): string[] =>
  wrapper.findAll('.user-card__name').map((item) => item.text())

describe('Users', () => {
  it('shows all 10 users from the data file', () => {
    const wrapper = mount(Users)

    expect(wrapper.findAllComponents(UserCard)).toHaveLength(10)
  })

  it('shows a message when the list is empty', () => {
    const wrapper = mount(Users, { props: { users: [] } })

    expect(wrapper.text()).toContain('Список юзерів пустий')
    expect(wrapper.findAllComponents(UserCard)).toHaveLength(0)
  })

  it('filters by gender and by age', async () => {
    const wrapper = mount(Users)

    await buttonByText(wrapper, 'Чоловіки').trigger('click')
    expect(wrapper.findAllComponents(UserCard)).toHaveLength(5)

    await buttonByText(wrapper, 'Жінки').trigger('click')
    await buttonByText(wrapper, '18 +').trigger('click')
    expect(wrapper.findAllComponents(UserCard)).toHaveLength(4)
  })

  it('sorts without breaking the active filters', async () => {
    const wrapper = mount(Users)

    await buttonByText(wrapper, 'Чоловіки').trigger('click')
    await buttonByText(wrapper, 'Вік ↓').trigger('click')

    const cards = wrapper.findAllComponents(UserCard)
    const ages = cards.map((card) => card.props('user').dob.age)
    expect(cards).toHaveLength(5)
    expect(ages).toEqual([...ages].sort((a, b) => b - a))
  })

  it('resets the filters and the sorting with the "Очистити все" button', async () => {
    const wrapper = mount(Users)
    const initial = names(wrapper)

    await buttonByText(wrapper, 'Жінки').trigger('click')
    await buttonByText(wrapper, 'Ім’я ↓').trigger('click')
    expect(names(wrapper)).not.toEqual(initial)

    await buttonByText(wrapper, 'Очистити все').trigger('click')
    expect(names(wrapper)).toEqual(initial)
  })
})
