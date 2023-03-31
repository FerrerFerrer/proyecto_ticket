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
    if(this.buscar.curp.length < 18 ||  /\d/.test(this.buscar.curp.substring(0,4))){
      console.log(this.buscar.curp.substring(0,3))
      alert("CURP INCORRECTA!")
    }else{
      alert('CURP Correcta')
    }
    
  }
  
}