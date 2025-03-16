import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogActivityComponent } from './blog-activity.component';

describe('BlogActivityComponent', () => {
  let component: BlogActivityComponent;
  let fixture: ComponentFixture<BlogActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
