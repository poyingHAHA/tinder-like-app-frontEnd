import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionContentComponent } from './option-content.component';

describe('OptionContentComponent', () => {
  let component: OptionContentComponent;
  let fixture: ComponentFixture<OptionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
