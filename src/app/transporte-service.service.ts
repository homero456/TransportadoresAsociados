import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from './models/Usuario';
@Injectable()
export class TransporteServiceService {
  domain:string="";
  constructor(private http:HttpClient) {

    getUsers(){
      this.http.get()
    }
    addUsers(){}
    updateUsers(){}
    deleteUsers(){}



   }

}
