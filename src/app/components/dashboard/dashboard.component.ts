import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  constructor(private _rutas: RoutesService) { }


    cSaltillo= 0;
    cMonterrey= 0;
    cArteaga= 0;
    cRamos= 0;
    cParras= 0;
  

  saleData:any;


  ngOnInit() {
    this.traertickets();
    
  }

  traertickets() {
    this._rutas.mostrarTickets().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          let aux = data[i];

          if (aux.municipio == 1) {
            this.cSaltillo += 1;
          }
          if (aux.municipio == 2) {
            this.cMonterrey += 1;
          }
          if (aux.municipio == 3) {
            this.cArteaga += 1;
          }
          if (aux.municipio == 4) {
            this.cRamos += 1;
          }
          if (aux.municipio == 5) {
            this.cParras += 1;
          }
        }

        this.saleData = [
          { name: "Saltillo", value: this.cSaltillo },
          { name: "Monterrey", value: this.cMonterrey },
          { name: "Arteaga", value: this.cArteaga },
          { name: "Ramos", value: this.cRamos },
          { name: "Parras", value: this.cParras }
        ];
      },
      (error) => {
        console.log(error);
      });
  }


}
