import { Directive, ElementRef, HostListener, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appMoreContent]'
})
export class MoreContentDirective implements AfterViewInit{
  @Input('text') text: string;

  showText: string

  isLoadMore: boolean;

  constructor(
    private el: ElementRef
  ) {
    this.text = "";
    this.showText = this.text;
    this.isLoadMore = false;
  }

  //onChange

  ngAfterViewInit(): void {
    this.updateText();
  }

  updateText()
  {
    if(this.isLoadMore){
      this.showText = this.text;
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
    this.updateText();
  }
}
