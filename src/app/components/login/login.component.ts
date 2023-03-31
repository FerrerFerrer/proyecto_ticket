import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutesService } from 'src/app/services/routes.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected aFormGroup!: FormGroup;
  sitekey = "6Ld2vTwlAAAAAOq2HOmphIqkqUM88LNbukDeX_mJ";

  captcha = false;
  res: any;
  admin = {
    email: "",
    password: ""
  }
  datosIncorrectos = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private _rutas: RoutesService) {


  }
  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: [null, Validators.required]
    });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha = true;
  }

  async validarAdmin() {
    console.log(this.captcha)
    this._rutas.verAdmins().subscribe((data) => {
      for (let i of data) {
        if (i.correo == this.admin.email) {


          if (i.contrasenia == this.admin.password) {


            if (this.captcha == true) {
              localStorage.setItem('id_admin', i.id_admin);
              this.router.navigateByUrl('/admin');
            }
          }
        }
        this.simulaAlert();
      }
    },
      (error) => {

      });
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
