import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { Subject, takeUntil } from 'rxjs';
import { ProfileLayoutService } from './../../../service/layout-service/profile-layout.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-option-content',
  templateUrl: './option-content.component.html',
  styleUrls: ['./option-content.component.css']
})
export class OptionContentComponent implements OnInit{
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  @Output('collapse') collapse: EventEmitter<boolean>;

  destroy$: Subject<any>;

  //pass a class as an parameter to the component factory
  typeDict: {[type: string]: Type<any>} = {
    "edit-profile": EditProfileComponent
  }

  constructor(
    private profileLayoutService: ProfileLayoutService
  ) {
    this.destroy$ = new Subject<string>();
    this.collapse = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    //use subscribe to detect settings event
    this.profileLayoutService.getOption$()
    .pipe(takeUntil(this.destroy$))
    .subscribe(type=>{
      let classType = this.typeDict[type];
      if(classType){
        this.container.clear();
        this.container.createComponent<typeof classType>(classType);
      }
    });
  }

  back(): void
  {
    this.collapse.emit(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
