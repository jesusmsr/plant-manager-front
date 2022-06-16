import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'plantmanager';
  isLoggedIn: boolean = false;

  constructor(
    private token: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }
}
