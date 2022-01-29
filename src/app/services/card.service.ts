import { Card } from './../models/card';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!:Card[]
  filteredCards!:Card[];

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private http:HttpClient
  ) { }

  getCards(){
    this.http.get<Card[]>(this.apiUrl+"/cards").subscribe((res:Card[])=>{
      this.cards=this.filteredCards=res
    })
  }

  addCard(card:Card){
    return this.http.post(this.apiUrl+"/cards",card)
  }

  updateCard(card:Card,cardId:Number){
    return this.http.put(this.apiUrl+"/cards/"+cardId,card)
  }


  deleteCard(cardId:Number){
    return this.http.delete(this.apiUrl+"/cards/"+cardId)
  }
}
