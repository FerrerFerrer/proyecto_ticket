import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from 'src/app/services/routes.service';
import jsPDF from 'jspdf';
import * as QRCode from 'qrcode';

declare var createPDF: any; // Importamos la función createPDF

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
  creado = false;
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
        setTimeout(() => {
          if(this.creado === true){
            this.crearPDF();
          }
      }, 3000);
      }
      else if (this.editando == "si"){
        this.editar_ticket();
        setTimeout(() => {
          if(this.creado === true){
            this.crearPDF();
          }
      }, 3000);
      }
    }
  }

  validar_aspirante() {
    const telefono = this.registerForm.controls['telefono'].value;
    const celular = this.registerForm.controls['celular'].value;
    const correo = this.registerForm.controls['correo'].value;
    const curp = this.Globalticket.curp;
    const nombreCompleto = this.Globalticket.nombre_completo;
    const nombre = this.Globalticket.nombre;
    const paterno = this.Globalticket.paterno;
    const materno = this.Globalticket.materno;
    const edad = this.registerForm.controls['edad'].value;
    const interes = this.Globalticket.grado;
    const interes2 = this.Globalticket.municipio;
    const interes3 = this.Globalticket.asunto;

    const telefonoRegex = /^[0-9]{10}$/;
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

    if (nombreCompleto.length < 10) {
      alert('El campo de nombre completo debe contener al menos 10 caracteres');
    }
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
      alert('Correo vacio o formato inválido');
    }
    else if (interes === 0) {
      alert('Debe seleccionar una opción para el campo de Nivel');
    }
    else if (interes2 === 0) {
      alert('Debe seleccionar una opción para el asunto');
    }
    else if (interes3 === 0) {
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

  getMayorItem(url: string): Promise<any> {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        let maxId = 0;
        let maxItem: any = null;
        data.forEach((item: any) => {
          if (item.id_ticket > maxId) {
            maxId = item.id_ticket;
            maxItem = item;
          }
        });

        return maxItem;
      })
      .catch(error => {
        console.error('Error:', error);
        throw new Error('Error al obtener el ticket con el id_ticket mayor');
      });
  }
  
  crearPDF() {
    this.getMayorItem('http://localhost:8080/api/ticket')
      .then(ticket => {
        const doc = new jsPDF();
        // Configuración del estilo del título
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        // Título
        doc.text(`Ticket #${ticket.id_ticket}`, 20, 30);
        // Línea separadora debajo del título
        doc.setLineWidth(0.5);
        doc.setDrawColor(200);
        doc.line(20, 35, 190, 35);
        // Configuración del estilo del resto del contenido
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 255);
        // Contenido del ticket
        doc.rect(10, 40, 190, 110);
        doc.setDrawColor(128);
        doc.setLineWidth(0.2);
        doc.setFillColor(240, 240, 240);
        doc.rect(11, 41, 188, 108, 'FD');
        doc.setTextColor(0, 0, 0);
        doc.text(`Nombre: ${ticket.nombre_completo}`, 15, 55);
        doc.text(`CURP: ${ticket.curp}`, 15, 65);
        doc.text(`Edad: ${ticket.edad}`, 15, 75);
        doc.text(`Teléfono: ${ticket.telefono}`, 15, 85);
        doc.text(`Celular: ${ticket.celular}`, 15, 95);
        doc.text(`Correo: ${ticket.correo}`, 15, 105);
        doc.text(`Grado: ${ticket.grado}`, 15, 115);
        doc.text(`Municipio: ${ticket.municipio}`, 15, 125);
        doc.text(`Asunto: ${ticket.asunto}`, 15, 135);
        doc.text(`Estatus: ${ticket.estatus}`, 15, 145);
        
        const qrCanvas = document.createElement('canvas');
        QRCode.toCanvas(qrCanvas, ticket.curp, (error) => {
          if (error) {
            console.error('Error al generar el código QR:', error);
          } else {
            const qrImg = qrCanvas.toDataURL('image/png');
            doc.addImage(qrImg, 'PNG', 130, 60, 50, 50);
          }
        });
  
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      })
      .catch(error => {
        console.error('Error al obtener los datos del API:', error);
      });
  } 

}