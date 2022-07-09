import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./edit-status.component.css']
})
export class EditStatusComponent implements OnInit {
  @Output('collapse') collapse: EventEmitter<boolean>;
  @Output('saveStatus') saveStatus: EventEmitter<string>;
  @Input('originalContent') originalContent?: string;

  content?: string;
  maxWords: number;

  isSaving: boolean;
  isVisible: boolean;

  popupTitle: string;
  popupContent: string;

  constructor() {
    this.collapse = new EventEmitter<boolean>();
    this.saveStatus = new EventEmitter<string>();
    this.isSaving = false;
    this.maxWords = 300;
    this.isVisible = false;
    this.popupTitle = "";
    this.popupContent = "";
  }

  ngOnInit(): void {
    this.content = this.originalContent;
  }

  back()
  {
    this.collapse.emit(false);
  }

  save()
  {
    if(this.content && this.content!="" && this.content.length <= this.maxWords){
      this.isSaving = true;
      setTimeout(() => {
        this.isSaving = false;
        this.back();
      }, 1500);
      this.saveStatus.emit(this.content);
    }else{
      this.createPopUp("Status Invalid", "Status is invalid.");
    }
  }

  createPopUp(title: string, content: string)
  {
    this.popupTitle = title;
    this.popupContent = content;
    this.isVisible = true;
  }
}
