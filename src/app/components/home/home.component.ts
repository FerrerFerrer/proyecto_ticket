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


  body = {
    asunto: 0,
    celular: 0,
    correo:"",
    curp : "",
    edad: 0, 
    grado:0,
    id_ticket:0,
    id_ticket_muni:0,
    materno:"",
    municipio:0,
    nombre:"",
    nombre_completo:"",
    paterno:"",
    telefono:0,
  };


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
        console.log("hola");
        this.buscarTicket(this.buscar.curp, this.buscar.turno);
      }
    }

  }


  async buscarTicket(curp: string, ticket: any) {
    
    this._rutas.consultarTicket(ticket, curp).subscribe(
      (data) => {
        console.log(data[0]);
        this.body = data[0];
        localStorage.setItem("editar", JSON.stringify(data[0]))
      },
      (error) => {
        console.log(error);
        
      })

  }

  editarTicket(){
  // //  let loco = localStorage.getItem("editar")
  //  console.log(loco);
  localStorage.setItem("respuesta","si");
   this.router.navigateByUrl('/ticket')
  }
}