import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `<re-captcha (resolved)="resolved($event)" siteKey="YOUR_SITE_KEY"></re-captcha>`,
})

export class AppComponent {

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  
}
