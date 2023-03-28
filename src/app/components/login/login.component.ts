import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  captcha: string;
  email: string;

  res: any;
  admin = {
    email: "",
    password: ""
  }
  datosIncorrectos = false;

  constructor(private router: Router) {
    this.captcha = '';
    this.email = 'Secret@email';
  }
  ngOnInit(): void {
  }
  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log('resolved captcha with response:' + this.captcha);
  }

  async validarAdmin() {
    let url = "http://localhost:8080/api/admin/";
    let data = {
      method: "GET",
      headers: { "Content-type": "application/json" }
    }
    const req = await fetch(url, data);
    this.res = await req.json();
    console.log(this.res);

    for (let i of this.res) {
      if (i.correo == this.admin.email) {
        console.log("nombre correcto");
        if (i.contrasenia == this.admin.password) {
          localStorage.setItem('id_admin', i.id_admin);
          console.log("pass correcto");
          this.router.navigateByUrl('/admin');
        }
      }
      this.simulaAlert();
    }
  }

  simulaAlert() {
    this.datosIncorrectos = true;
    setTimeout(() => {
      this.datosIncorrectos = false;
    }, 3000);
  }
  home() {
    this.router.navigateByUrl('/home');
  }
}
