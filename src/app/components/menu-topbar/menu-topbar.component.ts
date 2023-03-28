import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-topbar',
  templateUrl: './menu-topbar.component.html',
  styleUrls: ['./menu-topbar.component.scss']
})
export class MenuTopbarComponent {


  constructor(private router: Router){
  }

  

  cerrarSesion(){
    localStorage.removeItem("id_admin")
    this.router.navigateByUrl('/login');
  }
}
