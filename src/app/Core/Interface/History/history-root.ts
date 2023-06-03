import { LatestRate } from './../Latest/latest';


export interface HistoryRoot {
    success: boolean
    timestamp: number
    historical: boolean
    base: string
    date: string
    rates: LatestRate
}
