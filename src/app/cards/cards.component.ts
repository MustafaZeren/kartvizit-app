import { CardService } from './../services/card.service';
import { CardModalComponent } from './card-modal/card-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(
    public dialog:MatDialog,
    public cardService:CardService
  ) { }

  ngOnInit(): void {
    this.cardService.getCards()
  }

  openAddCardModal():void{
    const dialog=  this.dialog.open(CardModalComponent,{
      width:'400px'
    });
  }
}
