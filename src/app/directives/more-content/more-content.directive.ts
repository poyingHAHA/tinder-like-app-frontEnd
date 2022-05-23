import { Directive, ElementRef, HostListener, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appMoreContent]'
})
export class MoreContentDirective implements AfterViewInit{
  @Input('text') text: string;
  @Output('moreText') moreText: EventEmitter<boolean>;

  showText: string

  isLoadMore: boolean;

  constructor(
    private el: ElementRef
  ) {
    this.text = "";
    this.showText = this.text;
    this.isLoadMore = false;
    this.moreText = new EventEmitter<boolean>();
  }

  //onChange

  ngAfterViewInit(): void {
    this.updateText();
  }

  updateText()
  {
    if(this.isLoadMore){
      this.showText = this.text+"...less";
    }else{
      if(this.text.length >= 30){
        this.showText = this.text.substring(0, 30)+"...more";
      }else{
        this.showText = this.text;
      }
    }
    (this.el.nativeElement as HTMLElement).innerText = this.showText;
  }

  @HostListener('click', ['$event'])
  onClick($event: Event)
  {
    this.isLoadMore = !this.isLoadMore;
    this.moreText.emit(this.isLoadMore);
    this.updateText();
  }
}
