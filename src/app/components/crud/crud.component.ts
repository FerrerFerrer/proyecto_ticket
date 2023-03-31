import { Component } from '@angular/core';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {

  
  constructor( private _rutas: RoutesService) {}
  
}
