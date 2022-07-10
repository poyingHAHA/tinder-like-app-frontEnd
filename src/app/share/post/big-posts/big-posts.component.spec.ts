import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPostsComponent } from './big-posts.component';

describe('BigPostsComponent', () => {
  let component: BigPostsComponent;
  let fixture: ComponentFixture<BigPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
