import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LatestRate } from 'src/app/Core/Interface/Latest/latest';
import { SymbolRoot } from 'src/app/Core/Interface/Symbols/symbol-root';
import { CurrencyServiceService } from 'src/app/Core/Service/currency-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HistoryRoot } from 'src/app/Core/Interface/History/history-root';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  Currencies!:SymbolRoot[]
  LatestRate!:LatestRate
  currencyRate!:number;
  from:string='EUR'
  Years:number[]=[]
  monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
  ChoseMonth!:any
  currentMonth!:any
  ChosenYear!:string
  CurrentYear!:number
  getDate=new Date()
  History!:HistoryRoot[]
  HistoryRate!:number
customOptions: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
  startPosition:this.getDate.getMonth(),
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 3
    },
    500: {
      items: 4
    },
    600: {
      items: 5
    },
    740: {
      items: 6
    },
    940: {
      items: 7
    }
  },
  nav: true
}

  amountValue:number=0
  ExchangeAmount!:number
  ChosenCurrency!:any
  constructor(private CurrencyServiceService:CurrencyServiceService,private ActivatedRoute:ActivatedRoute,private Router:Router){
    this.ActivatedRoute.paramMap.subscribe({
      next:(Response)=>{
       
        this.ChosenCurrency= Response.get('Category')!
        this.Latest()
      }
    })
  }
  MonthIndex:number=0
  ngOnInit(): void {
    this.GetYears()
    this.Latest()
    this.GetSymbols()
    this.CurrentYear=this.getDate.getFullYear()
    this.currentMonth=this.monthNames[this.getDate.getMonth()]
    this.MonthIndex=this.getDate.getMonth()
    if(this.getDate.getMonth()+1<10){
      this.ChoseMonth='0'+(this.getDate.getMonth()+1)
    }else{
      this.ChoseMonth=(this.getDate.getMonth()+1)+''
     
    }
    this.ChosenYear=this.CurrentYear+''
    this.GetHistoryRate(this.from,this.ChosenCurrency,this.CurrentYear+'',this.ChoseMonth)
   
  }

  Goto(event:Event){
    let target=<HTMLInputElement>event.target
    this.Router.navigate(['/Details',target.value])
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

 

  Latest(){
    this.CurrencyServiceService.LatestRate(this.from,this.ChosenCurrency).subscribe({
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
  }




  GetYears(){
    let Current=new Date()
    
    for(let i=0;i<7;i++){
      this.Years.push(Current.getFullYear()-i)
    }
    

  }


  GetMonth(event:Event,i:number){
    let target=<HTMLInputElement>event.target
   if(target.classList.contains('disabled-button')!=true){
    let target=<HTMLInputElement>event.target
    let ElmentIndex=i
    target.classList.add('active')
    
    
    


    let x=document.querySelectorAll('.h2h')
    x.forEach((e,index)=>{
      
      if(ElmentIndex==index){

      }
      else{
        e.classList.remove('active')
      }
      
    })
    
   
    if(i+1<10){
      this.ChoseMonth='0'+(i+1)
    }else{
      this.ChoseMonth=i+1+''
     
    }
    this.GetHistoryRate(this.from,this.ChosenCurrency,this.ChosenYear,this.ChoseMonth)
   }
  }

  getYear(event:Event){
    let target=<HTMLInputElement>event.target
    this.ChosenYear=target.value 
    if(+(this.ChosenYear)==this.CurrentYear){
      this.MonthIndex=this.getDate.getMonth()
    }else{
      this.MonthIndex=12
    }
    this.GetHistoryRate(this.from,this.ChosenCurrency,this.ChosenYear,this.ChoseMonth)
  }

  GetHistoryRate(from:string,to:string,year:string,month:string){
    this.CurrencyServiceService.HistoricalRates(from,to,year,month).subscribe({
      next:(Response)=>{
        this.HistoryRate=Response.rates
        this.HistoryRate=Object.values( this.HistoryRate)[0].toFixed(2)
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
