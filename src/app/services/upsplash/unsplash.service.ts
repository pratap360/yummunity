import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService implements OnInit {

  private apiUrl = 'https://api.unsplash.com/photos';
  private clientId = environment.Unsplash_AccessKey;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // console.log('Unsplash Service is working');
  }


}
