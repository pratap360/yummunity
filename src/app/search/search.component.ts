import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
// import { SideNavBarComponent } from '../../components/side-nav-bar/side-nav-bar.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RecipePostsComponent } from '../../components/recipe-posts/recipe-posts.component';
import { AccountComponent } from '../account/account.component';
import { NotificationComponent } from '../notification/notification.component';
import { HomeFeedComponent } from '../home-feed/home-feed.component';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchSuggestionProfileComponent } from '../../components/search-suggestion-profile/search-suggestion-profile.component';
import { TrendingRecipesListComponent } from '../../components/trending-recipes-list/trending-recipes-list.component';
import { PostContainerComponent } from '../../components/post-container/post-container.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MealService } from '../services/mealdb/meal.service';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    // SideNavBarComponent,
    SidenavComponent,
    RecipePostsComponent,
    HomeFeedComponent,
    NotificationComponent,
    AccountComponent,
    SearchSuggestionProfileComponent,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    DatePipe,
    FormsModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    TrendingRecipesListComponent,
    PostContainerComponent,
    BottomNavComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  placeholderTexts: string[] = [
    'Search top rated recipes...',
    'Find your favorite dishes...',
    'Discover new cuisines...',
    'What are you craving today?',
    'Cook delicious meals...',
    'Cook something special...',
    'Discover diet-friendly recipes...',
    'Search Healthy Recipes...',
    'Search Yummunity peeps...',
  ];
  currentPlaceholder: string = '';
  private placeholderIndex = 0;
  private intervalId: any;

  searchQuery: string = '';
  isLoading: boolean = false;
  meals: any[] = [];
  isSearchSuggestions: boolean = true;
  hideShowText: boolean = false;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.currentPlaceholder = this.placeholderTexts[this.placeholderIndex];
    this.intervalId = setInterval(() => {
      this.placeholderIndex =
        (this.placeholderIndex + 1) % this.placeholderTexts.length;
      this.currentPlaceholder = this.placeholderTexts[this.placeholderIndex];
    }, 1500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      return;
    }

    this.isLoading = true;
    this.hideShowText = false;

    this.mealService.searchMeals(this.searchQuery).subscribe({
      next: ([responseOne, responseTwo]) => {
        const mealsOne = responseOne?.meals || [];
        const mealsTwo = responseTwo?.data || []; // Adjust if the API response structure differs

        this.meals = [...mealsOne, ...mealsTwo];
        this.isLoading = false;
        this.isSearchSuggestions = false;

        if (this.meals.length === 0) {
          this.hideShowText = true; // Show "No results found" message
        }
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.hideShowText = true;
      },
    });
  }

  openMealDetail(meal: any): void {
    window.open(meal.strSource || meal.link, '_blank'); // Adjust based on API structure
  }
  // users = [
  //   { name: 'User_name', id: 'user_id', bio: 'user’s bio' },
  //   { name: 'User_name', id: 'user_id', bio: 'user’s bio' },
  //   { name: 'User_name', id: 'user_id', bio: 'user’s bio' },
  //   { name: 'User_name', id: 'user_id', bio: 'user’s bio' }
  // ];
}
