import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
  private apiKey = 'xzj5QnItQBnTeN6Un9iLqDHBltHCUQA1Vqwb0qs952Vk760lSptyTc8m';  
  private apiUrl = 'https://api.pexels.com/v1/search';

  constructor(private http: HttpClient) {}

  getRandomFoodImage(): Observable<string | null> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey
    });

    return this.http.get<any>(this.apiUrl, {
      headers: headers,
      params: { query: 'foods and people', per_page: '1', orientation: 'landscape' }
    }).pipe(
      map(response => response.photos.length > 0 ? response.photos[0].src.large : null),
      catchError(error => {
        console.error('Error fetching image from Pexels API', error);
        return [null];
      })
    );
  }
}
