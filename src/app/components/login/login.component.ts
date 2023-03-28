import { Component, ViewChild } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  captcha: string;
  email: string;

  constructor(){
    this.captcha = '';
    this.email = 'Secret@email';
  }
  ngOnInit(): void {

  }
    resolved(captchaResponse: string) {
      this.captcha = captchaResponse;
      console.log('resolved captcha with response:' + this.captcha);

    }

  }
