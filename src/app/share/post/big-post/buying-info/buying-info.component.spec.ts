import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingInfoComponent } from './buying-info.component';

describe('BuyingInfoComponent', () => {
  let component: BuyingInfoComponent;
  let fixture: ComponentFixture<BuyingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
