import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import "rxjs/Rx"; 
import {Usuario} from './models/Usuario';
import {Vehiculo} from './models/Vehiculo';

@Injectable()
export class TransporteServiceService {
  
  domain:string="http://localhost:3000";
  
  constructor(private http:HttpClient) {}

  //#region Service Conductores

    getUsers(){
      return this.http.get<Usuario[]>(`${this.domain}/api/transporter`)
      .map(res=>res);
    }
    
    addUsers(newUser:Usuario){
      return this.http.post<Usuario>(`${this.domain}/api/transporter`,newUser)
      .map(res=>res);
    }
    
    updateUsers(user){
      return this.http.put(`${this.domain}/api/transporter/${user._id}`,user)
      .map(res=>res);
    }
    
    
    deleteUsers(id){
      return this.http.delete<Usuario>(`${this.domain}/api/transporter/${id}`)
      .map(res=>res);
    }

    //#endregion


    //#region Service Conductores

    getCars(){
      return this.http.get<Vehiculo[]>(`${this.domain}/api/cars`)
      .map(res=>res);
    }
    
    addCars(newCar:Vehiculo){
      return this.http.post<Vehiculo>(`${this.domain}/api/cars`,newCar)
      .map(res=>res);
    }
    
    updateCars(car){
      return this.http.put(`${this.domain}/api/cars/${car._id}`,car)
      .map(res=>res);
    }
    
    
    deleteCars(id){
      return this.http.delete<Vehiculo>(`${this.domain}/api/cars/${id}`)
      .map(res=>res);
    }

    //#endregion

   

}
