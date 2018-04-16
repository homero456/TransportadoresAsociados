import { Component, OnInit } from '@angular/core';
import { TransporteServiceService } from '../transporte-service.service';
import { Auditoria } from '../models/Auditoria';
@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  auditorias = [];
  busqueda: string;
  constructor(private transService: TransporteServiceService) {

    //load data
    transService.getAuditoria().subscribe(auditorias => {
      this.auditorias = auditorias;

      console.log("constructor");
    });


  }



  ngOnInit() {
    
  }

  filtrar(){
    
    if (this.busqueda !== '') {
      this.auditorias = this.auditorias.filter(x => x.ip.indexOf(this.busqueda) > 0 || x.usuario.indexOf(this.busqueda) > 0 || 
        x.accion.indexOf(this.busqueda) > 0  || x.module.indexOf(this.busqueda) > 0 || x.fecha.indexOf(this.busqueda) > 0 );
    }else{
      this.transService.getAuditoria().subscribe(auditorias => {
        this.auditorias = auditorias;
  
        console.log("constructor");
      });
    }
  }

}
