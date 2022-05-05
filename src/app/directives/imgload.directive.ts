import { Directive, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appImgload]'
})
export class ImgloadDirective implements AfterViewInit{
  @Output("imageLoaded") imageLoaded: EventEmitter<boolean>;

  constructor(
    private el: ElementRef
  ) {
    this.imageLoaded = new EventEmitter<boolean>(true);
  }

  ngAfterViewInit(): void {
    const img = new Image();
    const bgStyle = getComputedStyle(this.el.nativeElement).backgroundImage
    const src = bgStyle.replace(/(^url\()|(\)$|[\"\'])/g, '');

    img.src = src;
    img.addEventListener('load', ()=> {
      this.imageLoaded.emit(true);
    });
  }

}
