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
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('')
  });

  get name() { return this.editForm.get('name'); }
  get status() { return this.editForm.get('status') }
  get email() { return this.editForm.get('email'); }
  get birthday() { return this.editForm.get('birthday') }

  buyer$: Observable<Buyer>;

  constructor(
    private buyerService: BuyerService
  ) {
    this.buyer$ = buyerService.getBuyer();
  }

  ngOnInit(): void {
    this.buyer$
    .pipe(first())
    .subscribe(buyer=>{
      this.editForm.patchValue({
        name: buyer.account,
        status: buyer.selfIntro,
        email: buyer.email
      })
    });
  }

  editProfile()
  {

  }
}
