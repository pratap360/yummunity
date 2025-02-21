import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  constructor() {}
  setSignupData(data: { user_name: string; user_email: string; user_password: string }) {
    this.userData.next(data);
  }

  // Get stored signup data
  getSignupData() {
    return this.userData.getValue();
  }

}