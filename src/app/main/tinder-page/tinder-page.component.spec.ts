import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderPageComponent } from './tinder-page.component';

describe('TinderPageComponent', () => {
  let component: TinderPageComponent;
  let fixture: ComponentFixture<TinderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
