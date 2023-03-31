import { ParseSourceSpan } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-inter-admin',
  templateUrl: './inter-admin.component.html',
  styleUrls: ['./inter-admin.component.scss']
})
export class InterAdminComponent {
  title = 'tarea-angular';
  id = 0
  selects = {
    nivelValue: "Selecciona un nivel",
    municipioValue: "Selecciona un municipio",
    asuntoValue: "Selecciona un asunto",
    estatusValue: "Selecciona un estatus",
  }

  valores = {
    id_ticket: 0,
    id_ticket_muni: 0,
    nombre_completo: "",
    curp: "",
    nombre: "",
    paterno: "",
    materno: "",
    telefono: "",
    edad:0,
    celular: "",
    correo: "",
    grado: 0,
    municipio: 0,
    asunto: 0,
    estatus: "",
  }

  registerForm !: FormGroup
  searchForm !: FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder, private _rutas: RoutesService) {
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      folio: ['', Validators.required],
      curpSch: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      curp: ['', Validators.required],
      name: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      nivel: ['', Validators.required],
      asunto: ['', Validators.required],
      municipio: ['', Validators.required],
      status: ['', Validators.required],
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
      //let url = "http://localhost:8080/api/ticket/";
      alert("SUCCESS")

    }
  }

  async validar_aspirante() {
    const telefono = this.registerForm.controls['telefono'].value;
    const celular = this.registerForm.controls['celular'].value;
    const correo = this.registerForm.controls['correo'].value;
    const curp = this.registerForm.controls['curp'].value;
    const fullname = this.registerForm.controls['fullname'].value;
    const name = this.registerForm.controls['name'].value;
    const paterno = this.registerForm.controls['paterno'].value;
    const materno = this.registerForm.controls['materno'].value;
    const asunto = this.registerForm.controls['asunto'].value;
    const municipio = this.registerForm.controls['municipio'].value;
    const nivel = this.registerForm.controls['nivel'].value;

    const telefonoRegex = /^[0-9]{10}$/;
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const curpRegex = /^[a-zA-Z]{4}(\d{6})(([a-zA-Z]){6})(\d{2})?$/;

    if (fullname.length < 10) {
      alert('El campo de nombre completo debe contener al menos 10 caracteres');
    }
    else if (!curpRegex.test(curp)) {
      alert('El campo de CURP debe tener un formato válido');
    }
    else if (name.length < 5) {
      alert('El campo de nombre debe contener al menos 5 caracteres');
    }
    else if (paterno.length < 5) {
      alert('El campo de apellido paterno debe contener al menos 5 caracteres');
    }
    else if (materno.length < 5) {
      alert('El campo de apellido materno debe contener al menos 5 caracteres');
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
    else if (asunto == '') {
      alert('Debe seleccionar una opción para el campo de asunto');
      console.log(asunto)
    }
    else if (municipio == '') {
      alert('Debe seleccionar una opción para el nivel');
    }
    else if (nivel == '') {
      alert('Debe seleccionar una opción para el municipio');
    }
    else {
      alert('Todos los campos son válidos');
    }
  }

  async Busqueda() {
    var req = {
      id_ticket_muni: this.searchForm.controls['folio'].value,
      curp: this.searchForm.controls['curpSch'].value
    }

    this._rutas.mostrarTickets().subscribe((data) => {
      let stado = 0
      if (data) {
        for (let i of data) {
          if (i.id_ticket_muni == req.id_ticket_muni && i.curp == req.curp) {
            alert("Cargando ticket.");
            stado = 1;
            this.id = i.id_ticket;
            this.valores.id_ticket_muni = i.id_ticket_muni;
            this.valores.edad = i.edad;
            this.load(i);
            break;
          }
        }
        if (stado != 1) {
          alert("No existe el ticket.")
        }
      }
    },
      (error) => {
        alert("error al conectar con la db");
      }
    );
  }
  async load(data: any) {
    var cont = data;
    console.log(JSON.stringify(data));
    this.valores.nombre_completo = cont.nombre_completo;
    this.valores.curp = cont.curp;
    this.valores.nombre = cont.nombre;
    this.valores.paterno = cont.paterno;
    this.valores.materno = cont.materno;
    this.valores.telefono = cont.telefono;
    this.valores.celular = cont.celular;
    this.valores.correo = cont.correo;
    this.selects.nivelValue = cont.grado;
    this.selects.municipioValue = cont.municipio;
    this.selects.asuntoValue = cont.asunto;
    this.selects.estatusValue = cont.estatus;
  }
  
  async Agregar() {
    this.valores.id_ticket_muni = 1,
    this.valores.nombre_completo = this.registerForm.controls['fullname'].value,
    this.valores.curp = this.registerForm.controls['curp'].value,
    this.valores.nombre = this.registerForm.controls['name'].value,
    this.valores.paterno = this.registerForm.controls['paterno'].value,
    this.valores.materno = this.registerForm.controls['materno'].value,
    this.valores.telefono = this.registerForm.controls['telefono'].value,
    this.valores.celular = this.registerForm.controls['celular'].value,
    this.valores.correo = this.registerForm.controls['correo'].value,
    this.valores.grado = this.registerForm.controls['nivel'].value,
    this.valores.municipio = this.registerForm.controls['municipio'].value,
    this.valores.estatus = this.registerForm.controls['status'].value,
    this.valores.asunto = this.registerForm.controls['asunto'].value,
    this.valores.edad = 8

    alert("Añadiendo Registro.");
    this._rutas.crearTicket(this.valores).subscribe((data)=>{
      alert("Se añadio el registro." +JSON.stringify(data));
    },
    (error)=>{
      alert("No se pudo agregar el registro." +JSON.stringify(error));
    });
  }

  async Editar() {
    this.valores.id_ticket = this.id,
    this.valores.nombre_completo = this.registerForm.controls['fullname'].value,
    this.valores.curp = this.registerForm.controls['curp'].value,
    this.valores.nombre = this.registerForm.controls['name'].value,
    this.valores.paterno = this.registerForm.controls['paterno'].value,
    this.valores.materno = this.registerForm.controls['materno'].value,
    this.valores.telefono = this.registerForm.controls['telefono'].value,
    this.valores.celular = this.registerForm.controls['celular'].value,
    this.valores.correo = this.registerForm.controls['correo'].value,
    this.valores.grado = this.registerForm.controls['nivel'].value,
    this.valores.municipio = this.registerForm.controls['municipio'].value,
    this.valores.estatus = this.registerForm.controls['status'].value,
    this.valores.asunto = this.registerForm.controls['asunto'].value,
    console.log(this.valores)
    alert("Actualizando Registro.");
    this._rutas.actualizarTicket(this.valores, this.valores.id_ticket).subscribe((data)=>{
      alert("Se actualizo el registro." +JSON.stringify(data));
    },
    (error)=>{
      alert("No se pudo actualizar el registro." +JSON.stringify(error));
    });
  }

  async Eliminar() {
    alert("Eliminando registro.");
    console.log("id:" +this.id)
    if(this.id != 0){  
      this._rutas.borrarTicket(this.id).subscribe((data) => {
        alert("Registro Eliminado." +JSON.stringify(data))
      },
        (error) => {
          alert("error al conectar con la db"+JSON.stringify(error));
        }
      );
      this.id = 0;
    }
    else{
      alert("No hay nada que eliminar.");
    }
  }
}
