export interface Basket {
  id: number
  userId: string
  items: BasketItem[]
}

export interface BasketItem {
  serviceId: number
  name: string
  pictureUrl: string
  price: number[]
}