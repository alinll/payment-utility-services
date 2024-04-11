export interface Basket {
  id: number
  userId: string
  items: BasketItem[]
}

export interface BasketItem {
  serviceId: number
  name: string
  pictureUrl: string
  priceIndividual: number
  priceLegal: number
}