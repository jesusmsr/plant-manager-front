import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from './services/alerts.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'plantmanager';
  isLoggedIn: boolean = false;
  alertObservable?: Observable<any>;
  showAlert: boolean = false;
  alertMsg?: string;
  alertType?: string;

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.subscribeToAlerts();
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      //this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  subscribeToAlerts() {
    this.alertsService.subscribeToAlerts().subscribe(value => {
      if (value != null) {
        this.showAlert = true;
        this.alertType = value.alertType;
        this.alertMsg = value.alertMsg;
      }
      console.log(value);
    });
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }
}
