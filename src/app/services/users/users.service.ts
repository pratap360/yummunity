import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://6706a168a0e04071d227ad59.mockapi.io/users'
  // private apiUrl = 'https://randomuser.me/api/1.4/?results=4&nat=IN'

  constructor(private http: HttpClient) { }

  getsuggestUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
