import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostsComponent } from './add-posts.component';

describe('AddPostsComponent', () => {
  let component: AddPostsComponent;
  let fixture: ComponentFixture<AddPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
