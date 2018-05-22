import { Injectable } from '@angular/core';

const TOKEN_STORAGE_NAME: string = 'token';

@Injectable()
export class AuthService {

  public displayName: string = "";

  constructor() { }

  public getDisplayName(): string {
    return this.displayName;
  }

  public setDisplayName(displayName: string) {
    this.displayName = displayName;
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_STORAGE_NAME);
  }

  public setToken(token: string) {
    localStorage.setItem(TOKEN_STORAGE_NAME, token);
  }

  public clearToken() {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
    this.displayName = "";
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null;
  }
}
