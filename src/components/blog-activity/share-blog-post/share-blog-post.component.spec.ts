import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBlogPostComponent } from './share-blog-post.component';

describe('ShareBlogPostComponent', () => {
  let component: ShareBlogPostComponent;
  let fixture: ComponentFixture<ShareBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareBlogPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
