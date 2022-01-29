import { Card } from './../../models/card';
import { CardService } from './../../services/card.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent{

  constructor(
    private cardService:CardService
  ) { }

  search(searchText:string){
    searchText=searchText.toLowerCase();
    this.cardService.filteredCards =this.cardService.cards.filter((card:Card)=>{
      return card.title.toLowerCase().indexOf(searchText)>-1 || (card.name &&card.name.toLowerCase().indexOf(searchText)>-1)
    })
  }

}
