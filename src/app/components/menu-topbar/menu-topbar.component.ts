import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-topbar',
  templateUrl: './menu-topbar.component.html',
  styleUrls: ['./menu-topbar.component.scss']
})
export class MenuTopbarComponent {


  id = localStorage.getItem("id_admin");
  constructor(private router: Router){
  }

  ngOnInit() {
    // if(id != null){

    // }
  }

  cerrarSesion(){
    localStorage.removeItem("id_admin")
    this.router.navigateByUrl('/login');
  }
}
