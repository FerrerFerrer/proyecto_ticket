import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-inter-admin',
  templateUrl: './inter-admin.component.html',
  styleUrls: ['./inter-admin.component.scss']
})
export class InterAdminComponent {
  title = 'tarea-angular';
  
  res: any;
  admin = {
    email: "",
    password: ""
  }

  id = 0
  
  registerForm !: FormGroup
  searchForm !: FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      folio: ['', Validators.required],
      curpSch:['',Validators.required],
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
    }else {
      //let url = "http://localhost:8080/api/ticket/";
      alert("SUCCESS")

    }
  }
  
  validar_aspirante() {
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

  async Busqueda(){
    //const id_ticket = this.searchForm.controls['folio'].value;
    //const curp = this.searchForm.controls['curpSch'].value;
    const options = {
      method: 'GET',
      url: 'http://localhost:8080/api/ticket/',
      data: {
        id_ticket_muni: this.searchForm.controls['folio'].value,
        curp: this.searchForm.controls['curpSch'].value
      }
    };

    axios.request(options).then( (response) => {
      alert(response.data);
      console.log(response.data);
      this.id = response.data.id_ticket;
    }).catch(function (error) {
      console.error(error);
    });
  }
  getEdad(curp=""){
    var año = curp.substring(4,6);
    var mes = curp.substring(6,8);
    var dia = curp.substring(8,10);
    return 9;
  }
  
  GetIdMuni(muni=0){
    var id = 0

    return id
  }

  Agregar(){
    this.onSubmit();
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/api/ticket/',
      data: {
        nombre_completo: this.registerForm.controls['fullname'].value,
        id_ticket_muni: this.GetIdMuni(this.registerForm.controls['municipio'].value),
        nombre: this.registerForm.controls['name'].value,
        paterno: this.registerForm.controls['paterno'].value,
        materno: this.registerForm.controls['materno'].value,
        curp: this.registerForm.controls['curp'].value,
        edad: this.getEdad(this.registerForm.controls['curp'].value),
        telefono: this.registerForm.controls['telefono'].value,
        celular: this.registerForm.controls['celular'].value,
        correo: this.registerForm.controls['correo'].value,
        grado: this.registerForm.controls['nivel'].value,
        municipio: this.registerForm.controls['municipio'].value,
        asunto: this.registerForm.controls['asunto'].value
      }
    };

    axios.request(options).then(function (response) {
      alert(response.data);
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  Editar(){
    this.onSubmit();
    const options = {
      method: 'PUT',
      url: 'http://localhost:8080/api/ticket/',
      data: {
        nombre_completo: this.registerForm.controls['fullname'].value,
        id_ticket_muni: '5',
        nombre: this.registerForm.controls['name'].value,
        paterno: this.registerForm.controls['paterno'].value,
        materno: this.registerForm.controls['materno'].value,
        curp: this.registerForm.controls['curp'].value,
        edad: this.getEdad(this.registerForm.controls['curp'].value),
        telefono: this.registerForm.controls['telefono'].value,
        celular: this.registerForm.controls['celular'].value,
        correo: this.registerForm.controls['correo'].value,
        grado: this.registerForm.controls['nivel'].value,
        municipio: this.registerForm.controls['municipio'].value,
        asunto: this.registerForm.controls['asunto'].value
      }
    };

    axios.request(options).then(function (response) {
      alert(response.data);
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  Eliminar(){
    this.onSubmit();
    const options = {
      method: 'DELETE',
      url: 'http://localhost:8080/api/ticket/',
      data: {
        id_ticket: this.id
      }
    };

    axios.request(options).then(function (response) {
      alert(response.data);
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
}
