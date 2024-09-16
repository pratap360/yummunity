import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PexelsService {
  private API_URL = 'https://api.pexels.com/v1/search';
  private API_KEY = 'xzj5QnItQBnTeN6Un9iLqDHBltHCUQA1Vqwb0qs952Vk760lSptyTc8m';  // Replace this with your actual Pexels API key

  constructor(private http: HttpClient) {}

  getRandomFoodImage(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.API_KEY,
    });

    const params = {
      query: 'food',
      per_page: '1',  // Fetch multiple images to select randomly
    };

    return this.http.get(this.API_URL, { headers, params });
  }
}
