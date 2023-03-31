import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public API_URI ='http://localhost:8080/api/';
  constructor() { }
}
