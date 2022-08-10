import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePostFormComponent } from './share-post-form.component';

describe('SharePostFormComponent', () => {
  let component: SharePostFormComponent;
  let fixture: ComponentFixture<SharePostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharePostFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharePostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
