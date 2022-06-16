import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private token: TokenStorageService
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
