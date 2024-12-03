import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrlOne = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  // private apiUrlTwo = 'https://api.freeapi.app/api/v1/public/meals?query=';

  constructor(private http: HttpClient) {}

  searchMeals(query: string): Observable<any[]> {
    const requestOne = this.http.get<any>(this.apiUrlOne + query).pipe(
      catchError(() => of(null)) // Handle errors for API One
    );
    // const requestTwo = this.http.get<any>(this.apiUrlTwo + query).pipe(
    //   catchError(() => of(null)) // Handle errors for API Two
    // );

    // Combine both requests into a single observable
    return forkJoin([requestOne]);
    // return forkJoin([requestOne, requestTwo]);
  }
}
