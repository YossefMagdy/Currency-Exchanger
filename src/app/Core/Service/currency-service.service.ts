import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../Enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {

  constructor(private HttpClient: HttpClient) { }




  Symbols(): Observable<any> {
    return this.HttpClient.get(`${Enviroment.BaseUrl}symbols?access_key=${Enviroment.API_Key}`)
  }

  ConvertApi(from: string, to: string, amount: number): Observable<any> {
    return this.HttpClient.get(`${Enviroment.BaseUrl}convert?access_key=${Enviroment.API_Key}&from=${from}&to=${to}&amount=${amount}`)
  }
  LatestRate(base: string, to: string): Observable<any> {
    return this.HttpClient.get(`${Enviroment.BaseUrl}latest?access_key=${Enviroment.API_Key}&base=${base}&symbols=${to}`)
  }
  HistoricalRates(base: string, to: string, year: string, month: string): Observable<any> {
    return this.HttpClient.get(`${Enviroment.BaseUrl}${year}-${month}-01?access_key=${Enviroment.API_Key}&base=${base}&symbols=${to}`)
  }

}
