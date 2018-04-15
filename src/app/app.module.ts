import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { TransporteServiceService } from './transporte-service.service';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    VehiculosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TransporteServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
