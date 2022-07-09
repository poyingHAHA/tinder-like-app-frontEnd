import { PatchBuyer } from './../../../../model/DTO/PatchBuyer';
import { Buyer } from './../../../../model/interface/Buyer';
import { Observable, first } from 'rxjs';
import { BuyerService } from './../../../../service/buyer-service/buyer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl(''),
    birthday: new FormControl('')
  });

  get name() { return this.editForm.get('name'); }
  get status() { return this.editForm.get('status') }
  get birthday() { return this.editForm.get('birthday') }

  buyer$: Observable<Buyer>;
  isStatusActive: boolean;

  isSaving: boolean;
  isVisible: boolean;

  popupTitle: string;
  popupContent: string;

  constructor(
    private buyerService: BuyerService
  ) {
    this.buyer$ = buyerService.getBuyer();
    this.isStatusActive = false;
    this.isSaving = false;
    this.isVisible = false;
    this.popupTitle = "";
    this.popupContent = "";
  }

  ngOnInit(): void {
    this.buyer$
    .pipe(first())
    .subscribe(buyer=>{
      this.editForm.patchValue({
        name: buyer.account,
        status: buyer.selfIntro
      })
    });
  }

  editStatus()
  {
    this.isStatusActive = true;
  }

  saveStatus(event: string)
  {
    this.editForm.patchValue({
      status: event
    })
  }

  editProfile()
  {
    let patch: PatchBuyer = {
      _id: this.buyerService.getBuyerId(),
      name: this.editForm.value.name,
      status: this.editForm.value.status,
      birthday: this.editForm.value.birthday
    }

    this.buyerService.patchBuyer(patch).subscribe(buyer=>{
      this.isSaving = true;
      setTimeout(() => {
        if(buyer){
          this.createPopUp("Update Profile", "Upadte profile successfully!");
        }else{
          this.createPopUp("Update Profile", "Error occurs while updating profile");
        }
        this.isSaving = false;
      }, 1500);
    });
  }

  createPopUp(title: string, content: string)
  {
    this.popupTitle = title;
    this.popupContent = content;
    this.isVisible = true;
  }
}
