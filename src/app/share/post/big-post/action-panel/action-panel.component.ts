import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.css']
})
export class ActionPanelComponent implements OnInit {

  @Output('close') closeAction: EventEmitter<string>;
  @Input('actionType') actionType: "comment" | "shop" | '' = "";
  @Input('postId') postId: string = "";

  constructor() {
    this.closeAction = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  close()
  {
    this.closeAction.emit(this.actionType);
  }
}
