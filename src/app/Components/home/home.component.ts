import { Component,OnInit } from '@angular/core';
import { LatestRate } from 'src/app/Core/Interface/Latest/latest';
import { SymbolRoot } from 'src/app/Core/Interface/Symbols/symbol-root';
import { CurrencyServiceService } from 'src/app/Core/Service/currency-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Currencies!:SymbolRoot[]
  LatestRate!:LatestRate
  Topcurrecies!:LatestRate
  currencyRate!:number;
  from:string='EUR'
  to:string='USD'
  amountValue:number=0
  ExchangeAmount!:number
  Convert:boolean=false
  ConvertedAmoutTotop!:number
  constructor(private CurrencyServiceService:CurrencyServiceService){}
  ngOnInit(): void {
    this.GetSymbols()
    this.Latest()
    this.Top()
  }

  GetSymbols(){
    this.CurrencyServiceService.Symbols().subscribe({
      next:(Response)=>{
        if(Response.success==true){
          this.Currencies=Response.symbols
        }
        
      }
    })
  }


  To(event:Event){
    const target = event.target as HTMLButtonElement;
     this.to = target.value
     this.Latest()
  };

  Latest(){
    this.CurrencyServiceService.LatestRate(this.from,this.to).subscribe({
      next:(Response)=>{
        
        this.LatestRate=Response.rates
        this.currencyRate=Object.values( this.LatestRate)[0].toFixed(2)
        this.ExchangeAmount=(this.currencyRate*this.amountValue)
        this.ExchangeAmount=+(this.ExchangeAmount.toFixed(2))
      }
    })
  }
  convert(){
    this.ExchangeAmount=(this.currencyRate*this.amountValue)
    this.ExchangeAmount=+(this.ExchangeAmount.toFixed(2))
    this.Convert=true
    this.ConvertedAmoutTotop=this.amountValue
  }


  Top(){
    this.CurrencyServiceService.LatestRate(this.from,'USD,JPY,GBP,AUD,CAD,CHF,CNH,HKD,NZD,SGD').subscribe({
      next:(Response)=>{
        
        this.Topcurrecies=Response.rates
      }
    })
  }
  ClearInput(event:Event){
    let target=event.target as HTMLButtonElement
   if(target.value=='0'){
    target.value=''
   }  
  }

}
