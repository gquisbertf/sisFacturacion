import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth-service';
import { SessionService } from '../../services/session-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
})
export class Login {
  private cdr = inject(ChangeDetectorRef);

  loading = false;
  form!: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }
  login(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const { username, password } = this.form.value;

    this.authService.login(username!, password!).subscribe({
      next: user => {
        this.sessionService.saveSession(user);
        this.router.navigate(['/facturas']);
      },
      error: () => {
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }, 0);
      }
    });
  }

}