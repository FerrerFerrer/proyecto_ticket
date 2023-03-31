import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  muni = {
    municipio: "",
    estado: ""
  }

  asu = {
    descripcion: ""
  }

  grad = {
    nivel: ""
  }

  muniForm !: FormGroup
  gradoForm !: FormGroup
  asuntoForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private _rutas: RoutesService) {}

  ngOnInit(){
    this.muniForm = this.formBuilder.group({
      municipio: [''],
      estado: ['']
    });

    this.asuntoForm = this.formBuilder.group({
      asunto: ['']
    });

    this.gradoForm = this.formBuilder.group({
      grado: ['']
    });
  }
  async AltaMunicipio(){
    this.muni.municipio = this.muniForm.controls['municipio'].value;
    this.muni.estado = this.muniForm.controls['estado'].value;
    fetch('http://localhost:8080/api/municipio', {
      method: 'POST',
      body: JSON.stringify(this.muni),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Municipio creado con éxito');
        } else {
          alert('Error al crear Municipio');
        }
      })
      .catch(error => {
        alert('Error al crear Municipio');
      });
  }

  async AltaAsunto(){
    this.asu.descripcion = this.asuntoForm.controls['asunto'].value;
    fetch('http://localhost:8080/api/asunto', {
      method: 'POST',
      body: JSON.stringify(this.asu),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Asunto creado con éxito');
        } else {
          alert('Error al crear Asunto');
        }
      })
      .catch(error => {
        alert('Error al crear Asunto');
      });
  }

  async AltaGrado(){
    this.grad.nivel = this.gradoForm.controls['grado'].value;
    fetch('http://localhost:8080/api/nivel', {
      method: 'POST',
      body: JSON.stringify(this.grad),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Grado creado con éxito');
        } else {
          alert('Error al crear Grado');
        }
      })
      .catch(error => {
        alert('Error al crear Grado');
      });
  }
}
