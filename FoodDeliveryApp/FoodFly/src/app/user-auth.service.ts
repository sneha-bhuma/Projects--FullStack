import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private tokenKey = 'authToken';
  private userIdKey = 'userId';
  private userNameKey = 'userName';
  private isSuperuserKey = 'isSuperuser';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.isSuperuserKey);
  }

  setUserId(userId: number): void {
    localStorage.setItem(this.userIdKey, userId.toString());
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? +userId : null;
  }

  setUserName(userName: string): void {
    localStorage.setItem(this.userNameKey, userName);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  setIsSuperuser(isSuperuser: boolean): void {
    localStorage.setItem(this.isSuperuserKey, JSON.stringify(isSuperuser));
  }

  getIsSuperuser(): boolean {
    const isSuperuser = localStorage.getItem(this.isSuperuserKey);
    return isSuperuser ? JSON.parse(isSuperuser) : false;
  }
}
