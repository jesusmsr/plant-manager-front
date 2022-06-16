import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/models/alert.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isLoggedIn: boolean = false;
  errorMsg?: string;
  alert = new Alert();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private token: TokenStorageService,
    private alertsService: AlertsService
  ) { }

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response: any) => {
        console.log(response);
        this.token.saveToken(response.token.access);
        this.token.saveUser(response);
        this.isLoggedIn = true;
        this.reloadPage();
      },
        (error) => {

          this.errorMsg = error.error.error;
          this.alert.alertMsg = this.alertsService.getAlertMsg(this.errorMsg!);
          this.alert.alertType = 'alert-danger';
          this.alertsService.sendAlert(this.alert)
          console.log(this.getApiErrors(this.errorMsg));
        });
    }
  }

  getApiErrors(errorMsg: any): string {
    switch (errorMsg) {
      case 'badCredentials':
        return 'Bad credentials';
      default:
        return 'Unknown error';
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}
