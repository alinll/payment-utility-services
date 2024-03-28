export interface Service {
  id: number
  name: string
  pictureUrl: string
  price: number[]
  measureId: number
  measure: Measure
}

export interface Measure {
  id: number
  name: string
  services: string[]
}