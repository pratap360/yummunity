import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePostsComponent } from './recipe-posts.component';

describe('RecipePostsComponent', () => {
  let component: RecipePostsComponent;
  let fixture: ComponentFixture<RecipePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipePostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
