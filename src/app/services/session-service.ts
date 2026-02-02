import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly SESSION_KEY = 'auth_user';

  saveSession(user: any): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  }

  getSession(): any | null {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  }

  clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
