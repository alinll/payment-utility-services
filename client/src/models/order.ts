export interface Order {
  id: number
  userId: string
  orderDate: string
  orderItems: OrderItem[]
  orderStatus: string
  total: number
}

export interface OrderItem {
  serviceId: number
  name: string
  price: number
  personalAccountId: number
  personalAccount: PersonalAccount
}

export interface PersonalAccount {
  id: number
  previousCounterValue: number
  currentCounterValue: number
  difference: number
  price: number
  addressId: number
  serviceId: number
  address: Address
  service: Service
}

export interface Address {
  id: number
  region: string
  city: string
  street: string
  houseNumber: number
  partHouse: number
  apartmentNumber: number
  type: number
  userId: string
  user: User
  personalAccounts: string[]
}

export interface User {
  id: number
  userName: string
  lastName: string
  firstName: string
  midName: string
  email: string
  password: string
  roleId: number
  role: Role
  address: string[]
}

export interface Role {
  id: number
  name: string
  users: string[]
}

export interface Service {
  id: number
  name: string
  pictureUrl: string
  priceIndividual: number
  priceLegal: number
  hasCounter: boolean
  measureId: number
  measure: Measure
}

export interface Measure {
  id: number
  name: string
  services: string[]
}