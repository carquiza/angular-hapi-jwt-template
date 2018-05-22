import { Injectable } from '@angular/core';

const TOKEN_STORAGE_NAME: string = 'token';

@Injectable()
export class AuthService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem(TOKEN_STORAGE_NAME);
  }

  public setToken(token: string) {
    localStorage.setItem(TOKEN_STORAGE_NAME, token);
  }

  public clearToken() {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null;
  }
}
