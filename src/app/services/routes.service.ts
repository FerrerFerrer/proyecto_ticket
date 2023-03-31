import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesService extends ApiService {

  constructor(private http: HttpClient) { super() }

  verAdmins(): Observable<any> {
    return this.http.get(this.API_URI + "admin/")
  }

  mostrarTickets(): Observable<any> {
    return this.http.get(this.API_URI + "ticket/")
  }

  consultarTicket(id_ticket: any, curp: any): Observable<any> {
    return this.http.get(this.API_URI + "ticket/" + id_ticket +"/" + curp)
  }

  crearTicket(body: any): Observable<any> {
    return this.http.post(this.API_URI + "ticket/", body)
  }

  borrarTicket(body: any) : Observable<any>{
    return this.http.delete(this.API_URI + "ticket/" +body)
  }

  actualizarTicket(body: any) : Observable<any>{
    return this.http.put(this.API_URI + "ticket/", body)
  }
}
