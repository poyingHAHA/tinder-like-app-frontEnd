import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  @Output('closeInfo') closeInfo: EventEmitter<any>;

  constructor() {
    this.closeInfo = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  back()
  {
    this.closeInfo.emit();
  }
}
