import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostActivityComponent } from './post-activity.component';

describe('PostActivityComponent', () => {
  let component: PostActivityComponent;
  let fixture: ComponentFixture<PostActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
