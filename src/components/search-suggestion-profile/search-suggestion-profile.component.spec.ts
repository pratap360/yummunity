import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSuggestionProfileComponent } from './search-suggestion-profile.component';

describe('SearchSuggestionProfileComponent', () => {
  let component: SearchSuggestionProfileComponent;
  let fixture: ComponentFixture<SearchSuggestionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSuggestionProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSuggestionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
