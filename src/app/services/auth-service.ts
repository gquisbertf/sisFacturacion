import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly fakeUser = {
    username: 'admin',
    password: '123456',
    name: 'Administrador',
    role: 'ADMIN'
  };

  login(username: string, password: string): Observable<any> {
    return of({ username, password }).pipe(
      delay(1200),
      map(credentials => {
        if (
          credentials.username === this.fakeUser.username &&
          credentials.password === this.fakeUser.password
        ) {
          return {
            username: this.fakeUser.username,
            name: this.fakeUser.name,
            role: this.fakeUser.role
          };
        }
        throw new Error('Credenciales inválidas');
      })
    );
  }
}



