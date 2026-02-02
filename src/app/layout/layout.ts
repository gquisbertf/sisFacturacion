import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SessionService } from '../services/session-service';



@Component({
  selector: 'app-layout',  
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
   standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class Layout implements OnInit {
 user: any;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.getSession();
  }

  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
}
