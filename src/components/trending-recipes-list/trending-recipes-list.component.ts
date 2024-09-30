import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';



export interface Recipes_data {
  title: string;
  tag: string;
}
@Component({
  selector: 'app-trending-recipes-list',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule
  ],
  templateUrl: './trending-recipes-list.component.html',
  styleUrl: './trending-recipes-list.component.css'
})
export class TrendingRecipesListComponent {

  trendings: Recipes_data[] = [
    {title:'Butter Chicken',
      tag:'#chicken'
    },
    {title:'Paneer Butter Masala',
      tag:'#paneer'
    },
    {title:'Kolkata Biryani',
      tag:'#biryani'
    },
    {title:'Egg Curry',
      tag:'#egg'
    },
    
  ]
}
