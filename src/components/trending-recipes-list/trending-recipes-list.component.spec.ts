import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingRecipesListComponent } from './trending-recipes-list.component';

describe('TrendingRecipesListComponent', () => {
  let component: TrendingRecipesListComponent;
  let fixture: ComponentFixture<TrendingRecipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingRecipesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingRecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
