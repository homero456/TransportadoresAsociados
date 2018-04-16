import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { TransporteServiceService } from './transporte-service.service';
import { AsignarFlotaComponent } from './asignar-flota/asignar-flota.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Tabs} from '../libs/tabs';
import {Tab} from '../libs/tab';
import { AuditoriaComponent } from './auditoria/auditoria.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    VehiculosComponent,
    AsignarFlotaComponent,
    Tabs, Tab, AuditoriaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
   
    
  ],
  providers: [TransporteServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  

 }
