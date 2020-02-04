import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}
  private readonly JWT_TOKEN = 'X-Authorization';

  getAuthToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  setAuthToken(authToken) {
    localStorage.setItem(this.JWT_TOKEN, authToken);
  }

  removeAuthToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isAuthenticated(): boolean {
    const authToken = this.getAuthToken();
    if ( authToken && authToken != null ) {
      return true;
    }
    return false;
  }
}
