import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  buscar = { curp: "", turno: 0 }

  datosBusqueda = {}
  constructor(private router: Router, private _rutas: RoutesService) {
  }

  hacerticket() {
    this.router.navigateByUrl('/ticket')


  }
  validarTurno() {
    if (this.buscar.curp.length < 18 || /\d/.test(this.buscar.curp.substring(0, 4))) {
      console.log(this.buscar.curp.substring(0, 3))
      alert("CURP INCORRECTA!")
      return
    } else {
      if (this.buscar.turno < 0) {
        alert("TURNO INVALIDO!")
      }
      else {
        this.buscarTicket(this.buscar.curp, this.buscar.turno);
      }
    }

  }


  async buscarTicket(curp: string, ticket: any) {
    let ticketString: string = ticket;
    console.log(curp, ticket)
     this._rutas.consultarTicket(ticket, curp).subscribe(data => { });
      // (data) => {
      //   console.log(data);
      // },
      // (error) => {

      // })
      
  }

}