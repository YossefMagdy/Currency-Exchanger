import { LatestRate } from './latest';


export interface LatestRoot {
    success: boolean
  timestamp: number
  base: string
  date: string
  rates: LatestRate
}
