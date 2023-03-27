import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  title = 'tarea-angular';

  registerForm !: FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      curp: ['', Validators.required],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
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
      return;
    } else {
      alert("SUCCESS")
    }
  }
  validar_aspirante() {
    const telefono = this.registerForm.controls.telefono.value;
    const celular = this.registerForm.controls.celular.value;
    const correo = this.registerForm.controls.correo.value;
    const curp = this.registerForm.controls.curp.value;
  
    const telefonoRegex = /^[0-9]{10}$/;
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/;
  
    if (!telefonoRegex.test(telefono)) {
      alert('El campo de teléfono debe tener 10 dígitos numéricos');
    }
    else if (!telefonoRegex.test(celular)) {
      alert('El campo de celular debe tener 10 dígitos numéricos');
    }
    else if (!correoRegex.test(correo)) {
      alert('El campo de correo electrónico debe tener un formato válido');
    }
    else if (!curpRegex.test(curp)) {
      alert('El campo de CURP debe tener un formato válido');
    }
    else {
      alert('Todos los campos son válidos');
    }
  }
  

}
