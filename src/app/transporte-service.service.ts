import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import "rxjs/Rx";
import { Usuario } from './models/Usuario';
import { Vehiculo } from './models/Vehiculo';
import { FlotaUsuario } from './models/FlotaUsuario';
import { Auditoria } from './models/Auditoria';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TransporteServiceService {

  domain: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  //#region Service Conductores

  getUsers() {
    return this.http.get<Usuario[]>(`${this.domain}/api/transporter`)
      .map(res => res);
  }

  addUsers(newUser: Usuario) {
    return this.http.post<Usuario>(`${this.domain}/api/transporter`, newUser)
      .map(res => res);
  }

  updateUsers(user) {
    return this.http.put(`${this.domain}/api/transporter/${user._id}`, user)
      .map(res => res);
  }


  deleteUsers(id) {
    return this.http.delete<Usuario>(`${this.domain}/api/transporter/${id}`)
      .map(res => res);
  }

  //#endregion

  //#region Service Vehiculos

  getCars() {
    return this.http.get<Vehiculo[]>(`${this.domain}/api/cars`)
      .map(res => res);
  }

  addCars(newCar: Vehiculo) {
    return this.http.post<Vehiculo>(`${this.domain}/api/cars`, newCar)
      .map(res => res);
  }

  updateCars(car) {
    return this.http.put(`${this.domain}/api/cars/${car._id}`, car)
      .map(res => res);
  }


  deleteCars(id) {
    return this.http.delete<Vehiculo>(`${this.domain}/api/cars/${id}`)
      .map(res => res);
  }

  //#endregion

  //#region Service Asignar flotas

  getFlotas() {
    return this.http.get<FlotaUsuario[]>(`${this.domain}/api/flotas`)
      .map(res => res);
  }

  addFlotas(newflota: FlotaUsuario) {
    return this.http.post<FlotaUsuario>(`${this.domain}/api/flotas`, newflota)
      .map(res => res);
  }

  updateFlotas(flota) {
    return this.http.put(`${this.domain}/api/flotas/${flota._id}`, flota)
      .map(res => res);
  }


  deleteFlotas(id) {
    return this.http.delete<FlotaUsuario>(`${this.domain}/api/flotas/${id}`)
      .map(res => res);
  }

  //#endregion


  //#region Auditorias
  addAuditoria(aud: Auditoria) {
    return this.http.post<Auditoria>(`${this.domain}/api/auditorias`, aud)
      .map(res => res);
  }

  getAuditoria() {
    return this.http.get<Auditoria[]>(`${this.domain}/api/auditorias`)
      .map(res => res);
  }
  //#endregion

  getIpAddress() {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get('http://freegeoip.net/json/?callback',
        )
      .map(response => response || {})
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('observable error: ', error);
    return Observable.throw(error);
  }

}
