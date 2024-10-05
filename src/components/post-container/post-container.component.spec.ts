import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContainerComponent } from './post-container.component';

describe('PostContainerComponent', () => {
  let component: PostContainerComponent;
  let fixture: ComponentFixture<PostContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
