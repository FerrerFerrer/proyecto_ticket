import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  title = 'tarea-angular';
  editando = "no";
  Globalticket = {
    id_ticket:0,
    id_ticket_muni: 0,
    nombre_completo: "",
    nombre: "",
    paterno: "",
    materno: "",
    curp: "",
    edad: 0,
    telefono: 0,
    celular: 0,
    correo: "",
    grado: 0,
    municipio: 0,
    asunto: 0
  };

  registerForm !: FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder, private _rutas:RoutesService) { }

  ngOnInit() {
    this.editando = "si";
    let respuesta = localStorage.getItem("respuesta");
    if(respuesta == "si"){
      let valores: any = localStorage.getItem("editar");
      valores = JSON.parse(valores);
      this.Globalticket = valores;
      localStorage.removeItem("editar")
      localStorage.setItem("respuesta", "no");
    }

    this.registerForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      curp: ['', Validators.required],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      edad: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      interes: ['', Validators.required],
      interes2: ['', Validators.required],
      interes3: ['', Validators.required],
      // nombre: ['', [Validators.required, Validators.email]],
      // paterno: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  onSubmit() {
    this.submitted = true;
    //detiene el proceso si la forma es invalida
    if (this.registerForm.invalid) {
      this.validar_aspirante();
    } else {
      if(this.editando == "no"){
        this.crear_Ticket();
      }
      else if (this.editando == "si"){
        this.editar_ticket();
      }
    }
  }

  validar_aspirante() {
    const telefono = this.registerForm.controls['telefono'].value;
    const celular = this.registerForm.controls['celular'].value;
    const correo = this.registerForm.controls['correo'].value;
    const curp = this.registerForm.controls['curp'].value;
    // const nombreCompleto = this.registerForm.controls['nombreCompleto'].value;
    const nombre = this.registerForm.controls['nombre'].value;
    const paterno = this.registerForm.controls['paterno'].value;
    const materno = this.registerForm.controls['materno'].value;
    const edad = this.registerForm.controls['edad'].value;
    const interes = this.registerForm.controls['interes'].value;
    const interes2 = this.registerForm.controls['interes2'].value;
    const interes3 = this.registerForm.controls['interes3'].value;

    const telefonoRegex = /^[0-9]{10}$/;
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;


    // if (nombreCompleto.length < 10) {
    //   alert('El campo de nombre completo debe contener al menos 10 caracteres');
    // }

    if (!curpRegex.test(curp)) {
      alert('El campo de CURP debe tener un formato válido');
    }
    else if (nombre.length < 5) {
      alert('El campo de nombre debe contener al menos 5 caracteres');
    }
    else if (paterno.length < 5) {
      alert('El campo de apellido paterno debe contener al menos 5 caracteres');
    }
    else if (materno.length < 5) {
      alert('El campo de apellido materno debe contener al menos 5 caracteres');
    }
    else if (edad.length < 0) {
      alert('El campo de apellido edad debe ser mayor a cero');
    }
    else if (!telefonoRegex.test(telefono)) {
      alert('El campo de teléfono debe tener 10 dígitos numéricos');
    }
    else if (!telefonoRegex.test(celular)) {
      alert('El campo de celular debe tener 10 dígitos numéricos');
    }
    else if (!correoRegex.test(correo)) {
      alert('El campo de correo electrónico debe tener un formato válido');
    }
    else if (interes === 'Interes') {
      alert('Debe seleccionar una opción para el campo de "Interes"');
    }
    else if (interes2 === 'Municipio') {
      alert('Debe seleccionar una opción para el nivel');
    }
    else if (interes3 === 'Interes') {
      alert('Debe seleccionar una opción para el municipio');
    }
    else {
      alert('Todos los campos son válidos');
    }
  }

  crear_Ticket() {
    const ticket = {
      id_ticket_muni: this.Globalticket.id_ticket_muni,
      nombre_completo: this.Globalticket.nombre_completo,
      nombre: this.Globalticket.nombre,
      paterno: this.Globalticket.paterno,
      materno: this.Globalticket.materno,
      curp: this.Globalticket.curp,
      edad: this.Globalticket.edad,
      telefono: this.Globalticket.telefono,
      celular: this.Globalticket.celular,
      correo: this.Globalticket.correo,
      grado: this.Globalticket.grado,
      municipio: this.Globalticket.municipio,
      asunto: this.Globalticket.asunto
    };

    fetch('http://localhost:8080/api/ticket', {
      method: 'POST',
      body: JSON.stringify(ticket),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Ticket creado con éxito');
        } else {
          alert('Error al crear ticket');
        }
      })
      .catch(error => {
        alert('Error al crear ticket');
      });
  }


  editar_ticket(){
    const ticket = {
      id_ticket_muni: this.Globalticket.id_ticket_muni,
      nombre_completo: this.Globalticket.nombre_completo,
      nombre: this.Globalticket.nombre,
      paterno: this.Globalticket.paterno,
      materno: this.Globalticket.materno,
      curp: this.Globalticket.curp,
      edad: this.Globalticket.edad,
      telefono: this.Globalticket.telefono,
      celular: this.Globalticket.celular,
      correo: this.Globalticket.correo,
      grado: this.Globalticket.grado,
      municipio: this.Globalticket.municipio,
      asunto: this.Globalticket.asunto
    };

    this._rutas.actualizarTicket(ticket, this.Globalticket.id_ticket).subscribe((data)=>{
      alert("editado exitosamente")
    },
    (error)=>{
      alert("Ha ocurrido un error")
    });
    
  }
}