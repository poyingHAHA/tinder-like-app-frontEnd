import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entire-loader-roller',
  templateUrl: './entire-loader-roller.component.html',
  styleUrls: ['./entire-loader-roller.component.css']
})
export class EntireLoaderRollerComponent implements OnInit {
  @Input('isLoading') isLoading: boolean;


  constructor() {
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

}
