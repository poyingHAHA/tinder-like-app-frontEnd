import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntireLoaderRollerComponent } from './entire-loader-roller.component';

describe('EntireLoaderRollerComponent', () => {
  let component: EntireLoaderRollerComponent;
  let fixture: ComponentFixture<EntireLoaderRollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntireLoaderRollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntireLoaderRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
