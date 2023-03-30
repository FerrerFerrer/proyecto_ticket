import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  buscar = {curp:"",turno:""}
  constructor(private router: Router) {
  }

  hacerticket() {
    this.router.navigateByUrl('/ticket')
    

  }
  validarTurno() {
    
    
  }

}