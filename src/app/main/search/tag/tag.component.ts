import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  //here place in a label object
  @Input('label') label: string;
  @Input('isActive') isActive: boolean;

  constructor() {
    this.isActive = false;
    this.label = "";
  }

  ngOnInit(): void {
  }

}
