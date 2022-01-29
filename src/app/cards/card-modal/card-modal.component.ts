import { SnackbarService } from './../../services/snackbar.service';
import { CardService } from './../../services/card.service';
import { Card } from './../../models/card';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!:FormGroup
  showSpinner:boolean=false

  constructor(
    private dialogRef:MatDialogRef<CardModalComponent>,
    private service:CardService,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _snackBarService:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data:Card
  ) { }

  ngOnInit(): void {
    this.cardForm=this.fb.group({
      name:[this.data?.name       || '',[Validators.maxLength(50)]],
      title:[this.data?.title     || '',[Validators.required, Validators.maxLength(255)]],
      phone:[this.data?.phone     || '',[Validators.required,Validators.maxLength(20)]],
      email:[this.data?.email     || '',[Validators.email,Validators.maxLength(50)]],
      address:[this.data?.address || '',[Validators.maxLength(255)]],
    })
  }

  addCard(){

    this.showSpinner=true

    this.service.addCard(this.cardForm.value).subscribe((res:any)=>{
      console.log(res)
      this.getSuccess("Eklendi")
    },(err:any)=>{
      this.getError(err.message||"Kartvizit Eklenirken Bir Sorun Oluştu")
    })
  }

  updateCard(){

    this.showSpinner=true

    this.service.updateCard(this.cardForm.value,this.data.id).subscribe((res:any)=>{
      console.log(res)
      this.getSuccess("Güncellendi")

    },(err:any)=>{
      this.getError(err.message||"Kartvizit Güncellenirken Bir Sorun Oluştu")
    })
  }

  deleteCard(){

    this.showSpinner=true

    this.service.deleteCard(this.data.id).subscribe((res:any)=>{
      this.getSuccess("Silindi")
    },(err:any)=>{
      this.getError(err.message||"Kartvizit Silinirken Bir Sorun Oluştu")
    })
  }

  getSuccess(message:string){

    this._snackBarService.createSnackBar("success",message)
    this.service.getCards();
    this.showSpinner=false
    this.dialogRef.close()
  }

  getError(message:string){
    this._snackBarService.createSnackBar("error",message)
    this.showSpinner=false
  }

}
