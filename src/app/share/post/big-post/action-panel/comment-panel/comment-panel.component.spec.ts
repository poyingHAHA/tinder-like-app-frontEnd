import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPanelComponent } from './comment-panel.component';

describe('CommentPanelComponent', () => {
  let component: CommentPanelComponent;
  let fixture: ComponentFixture<CommentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
