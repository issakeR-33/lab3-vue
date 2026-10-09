export type Gender = 'male' | 'female'

export interface UserName {
  title: string
  first: string
  last: string
}

export interface UserLocation {
  street: { number: number; name: string }
  city: string
  state: string
  country: string
  postcode: number
  timezone: { offset: string; description: string }
}

export interface User {
  id: number
  gender: Gender
  name: UserName
  location: UserLocation
  email: string
  dob: { date: string; age: number }
  phone: string
  cell: string
  picture: string
}
