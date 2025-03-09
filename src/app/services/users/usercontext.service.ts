import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../../interface/user-data';

@Injectable({
  providedIn: 'root',
})
export class UsercontextService {
  private postUserDataMap = new BehaviorSubject<{ [postId: string]: UserData }>(
    {}
  );

  postUserData$ = this.postUserDataMap.asObservable();

  constructor() {}

  updatePostUserData(postId: string, userData: UserData): void {
    const currentMap = this.postUserDataMap.value;
    this.postUserDataMap.next({
      ...currentMap,
      [postId]: userData,
    });
  }

  updateBulkPostUserData(data: { [postId: string]: UserData }): void {
    const currentMap = this.postUserDataMap.value;
    this.postUserDataMap.next({
      ...currentMap,
      ...data,
    });
  }

  clearPostUserData(): void {
    this.postUserDataMap.next({});
  }
}
