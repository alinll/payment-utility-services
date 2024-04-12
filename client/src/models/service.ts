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