import { PatchBuyer } from './../../../../model/DTO/PatchBuyer';
import { Buyer } from './../../../../model/interface/Buyer';
import { Observable, first, mergeMap, of, forkJoin, BehaviorSubject, switchMap, switchMapTo } from 'rxjs';
import { BuyerService } from './../../../../service/buyer-service/buyer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfilePic } from 'src/app/model/DTO/ProfilePic';

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
  buyerPic$: Observable<string>;
  refreshPic$: BehaviorSubject<string|null>;

  isStatusActive: boolean;
  isSaving: boolean;
  isVisible: boolean;

  popupTitle: string;
  popupContent: string;
  selectedFile?: File;
  previewPicURL: string|null;

  constructor(
    private buyerService: BuyerService
  ) {
    this.previewPicURL = null;
    this.refreshPic$ = new BehaviorSubject<string|null>(null);
    this.buyer$ = buyerService.getBuyer();
    this.buyerPic$ = this.refreshPic$.pipe(
      mergeMap((preview: string|null)=>{
        if(preview){
          return of(preview);
        }else{
          return buyerService.getBuyer().pipe(
            mergeMap(buyer=>of(buyer.profilePic))
          );
        }
      })
    )

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
        status: buyer.selfIntro,
        birthday: buyer.birthday
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
      birthday: this.editForm.value.birthday,
    }

    let patch$ = null;
    if(this.selectedFile){
      const patchPic: ProfilePic = {
        buyerid: this.buyerService.getBuyerId(),
        profilePic: this.selectedFile
      };
      patch$ = forkJoin({
        profilePic: this.buyerService.patchBuyerProfilePic(patchPic),
        buyerInfo: this.buyerService.patchBuyer(patch)
      }).subscribe(res=>{
        this.isSaving = true;
        setTimeout(() => {
          if(res){
            this.createPopUp("Update Profile", "Upadte profile successfully!");
          }else{
            this.createPopUp("Update Profile", "Error occurs while updating profile");
          }
          this.isSaving = false;
          location.reload();
        }, 1500);
      });
    }else{
      patch$ = this.buyerService.patchBuyer(patch).subscribe(buyer=>{
        this.isSaving = true;
        setTimeout(() => {
          if(buyer){
            this.createPopUp("Update Profile", "Upadte profile successfully!");
          }else{
            this.createPopUp("Update Profile", "Error occurs while updating profile");
          }
          this.isSaving = false;
          location.reload();
        }, 1500);
      });
    }
  }

  createPopUp(title: string, content: string)
  {
    this.popupTitle = title;
    this.popupContent = content;
    this.isVisible = true;
  }

  onFileSelect(event: Event)
  {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList|null = element.files;
    if(fileList){
      this.selectedFile = fileList[0];
      this.previewPic(this.selectedFile);
    }
  }

  previewPic(file: File)
  {
    const reader = new FileReader();

    //use rxjs to wait
    let readFile$ = new Observable(observer=>{
      reader.onload = e => {
        this.previewPicURL = reader.result as string;
        observer.next(this.previewPicURL);
      }

      reader.readAsDataURL(file);
    })

    readFile$
    .pipe(first())
    .subscribe(preview=>{
      this.refreshPic();
    });

  }

  refreshPic()
  {
    this.refreshPic$.next(this.previewPicURL);
  }
}
