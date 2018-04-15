import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vehiculo } from '../models/Vehiculo';
import { Usuario } from '../models/Usuario';
import { FlotaUsuario } from '../models/FlotaUsuario';
import { TransporteServiceService } from '../transporte-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-asignar-flota',
  templateUrl: './asignar-flota.component.html',
  styleUrls: ['./asignar-flota.component.css']
})
export class AsignarFlotaComponent implements OnInit {

  formAsignarFlota: FormGroup;
  flotas = [];
  flota = new FlotaUsuario();
  vehiculos = [];
  conductores = [];
  flotasServer = [];

  constructor(private fb: FormBuilder, private transService: TransporteServiceService) {

    this.flota.conductor = new Usuario();
    this.flota.vehiculo = new Vehiculo();

    //load data
    transService.getFlotas().subscribe(flotas => {
      this.flotas = flotas;
      console.log("constructor");
    });




    this.formAsignarFlota = fb.group({
      conductor: ['', Validators.compose([
        Validators.required
      ])],
      vehiculo: ['', Validators.compose([
        Validators.required
      ])],
      descripcion: ['', Validators.compose([
        Validators.required
      ])],
      origen: ['', Validators.compose([
        Validators.required
      ])],
      destino: ['', Validators.compose([
        Validators.required
      ])],
      fecha: ['', Validators.compose([
        Validators.required
      ])]
    })

  }

  ngOnInit() {
    this.transService.getCars().subscribe(cars => {
      this.vehiculos = cars;
      console.log(cars);
    });
    this.transService.getUsers().subscribe(users => {
      this.conductores = users;
      console.log(users);
    });
    console.log("init");
  }


  newFlota() {
    console.log("new");
    this.flota._id = '';
    this.flota.conductor._id = null;
    this.flota.vehiculo._id = null;
    this.flota.descripcion = '';
    this.flota.origen = '';
    this.flota.destino = '';
  }

  addAsignarFlota(event) {
    event.preventDefault();

   
    if (this.formAsignarFlota.valid) {

      //Se realiza validación de colisión por conductor,flota, fecha.
      this.transService.getFlotas().subscribe(flotas => {
        this.flotasServer = flotas;
        var isColision = this.validarColision();
        
        console.log(isColision);
        if (isColision) {
          alert("El conductor " + this.flota.conductor.name + " presenta colisión con la flota " + this.flota.vehiculo.placa);
          return;
        }
        //Guardar
        if (this.flota._id == undefined || this.flota._id == null) {
          //var c:  Usuario;
          var c = this.conductores.filter(x => x._id === this.flota.conductor._id)[0];
          var v = this.vehiculos.filter(x => x._id === this.flota.vehiculo._id)[0];
          const newflota: FlotaUsuario = {
            conductor: c,
            vehiculo: v,
            origen: this.flota.origen,
            destino: this.flota.destino,
            descripcion: this.flota.descripcion,
            fecha: this.flota.fecha,
          };

          this.transService.addFlotas(newflota)
            .subscribe(resultflota => {
              console.log(resultflota);

              this.flotas.push(resultflota);
              this.newFlota();
              alert("Guardado");
            });
        } else {
          //Update
          console.log(this.flota);
          this.updateFlota(this.flota);
        }

      });
    } else {

    }
  }


  deleteFlota(id) {
    const isDelete = confirm("Está seguro de eliminar el registro?");
    if (isDelete) {
      this.transService.deleteFlotas(id)
        .subscribe(flota => {
          for (let i = 0; i < this.flotas.length; i++) {
            if (this.flotas[i]._id == id) {
              this.flotas.splice(i, 1);
            }
          }
        });
    }
    return;
  }

  updateFlota(flota: FlotaUsuario) {
    const newflota: FlotaUsuario = {
      _id: flota._id,
      conductor: flota.conductor,
      vehiculo: flota.vehiculo,
      descripcion: flota.descripcion,
      origen: flota.origen,
      destino: flota.destino,
      fecha: flota.fecha,
    };

    this.transService.updateFlotas(newflota).subscribe(res => {

      alert("Actualizado");
      this.transService.getFlotas().subscribe(flotas => {
        this.flotas = flotas;
        this.flota = new FlotaUsuario;
        this.flota.conductor = new Usuario();
        this.flota.vehiculo = new Vehiculo();
      });
    });

  }
  getFlota(flota) {

    //var tmp = new FlotaUsuario;
    //tmp = flota;
    this.flota = flota;
    //console.log(updateFlota);
    //this.flota = updateFlota;


  }


  validarColision(){    
    for(let item of this.flotasServer){
      if( (item.conductor._id  === this.flota.conductor._id || item.vehiculo._id === this.flota.vehiculo._id && item._id != this.flota._id)
      && item.fecha.get === this.flota.fecha)
      {
        return true;
      }
      console.log(this.flota.fecha.getDay());
   }     
  }
}
