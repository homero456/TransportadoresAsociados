import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vehiculo } from '../models/Vehiculo';
import { TransporteServiceService } from '../transporte-service.service';
import { Auditoria } from '../models/Auditoria';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {


  formVehiculo: FormGroup;
  cars = [];
  car = new Vehiculo();
  ip= "";
  constructor(private fb: FormBuilder, private transService: TransporteServiceService) {

    //load data
    transService.getCars().subscribe(cars => {
      this.cars = cars;
      console.log(cars);
     
    });

    this.formVehiculo = fb.group({
      typecar: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5)
      ])],
      placa: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5)
      ])],
      descripcion: ['', Validators.compose([
        Validators.required
      ])]
    })

  }

  ngOnInit() {
    console.log("ip");
    this.transService.getIpAddress().subscribe(data => {
      this.ip=data.ip;
      this.auditoria('load','Vehiculo');
    });
  }

  newCar() {
    this.car._id = null;
    this.car.typecar = '';
    this.car.placa = '';
    this.car.descripcion = null;
  }

  addVehiculo(event) {
    event.preventDefault();
    if (this.formVehiculo.valid) {

      //Guardar
      if (this.car._id == undefined || this.car._id == null) {
        const newCar: Vehiculo = {
          typecar: this.car.typecar,
          placa: this.car.placa,
          descripcion: this.car.descripcion
        };

        this.transService.addCars(newCar)
          .subscribe(car => {
            this.cars.push(car);
            this.newCar();
            alert("Guardado");
            this.auditoria('adicionar','Vehiculo')
          });
      } else {
        //Update
        console.log(this.car);
        this.updateCar(this.car);

      }
    } else {

    }
  }


  deleteCar(id) {
    const isDelete = confirm("Está seguro de eliminar el registro?");
    if (isDelete) {
      this.transService.deleteCars(id)
        .subscribe(car => {
          for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i]._id == id) {
              this.cars.splice(i, 1);
            }
          }
          this.auditoria('delete','Vehiculo')
        });
    }
    return;
  }

  updateCar(car: Vehiculo) {
    const newCar: Vehiculo = {
      _id: car._id,
      typecar: car.typecar,
      placa: car.typecar,
      descripcion: car.descripcion
    };

    this.transService.updateUsers(newCar).subscribe(res => {

      alert("Actualizado");
      this.transService.getCars().subscribe(cars => {
        this.cars = cars;
        this.car = new Vehiculo;
        this.auditoria('actualizado','Vehiculo')

      });
    });

  }
  getCar(updateCar) {
    console.log(updateCar);
    this.car = updateCar;

  }

  auditoria(accion, modulo) {
    const aud: Auditoria = {
      ip: this.ip,
      usuario: "fvalencia",
      fecha: new Date(),
      accion: accion,
      module: modulo
    };
    this.transService.addAuditoria(aud)
      .subscribe(result => {

      });
  }

}
