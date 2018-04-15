import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vehiculo } from '../models/Vehiculo';
import { TransporteServiceService } from '../transporte-service.service';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {


  formVehiculo: FormGroup;
  cars = [];
  car = new Vehiculo();
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
  }


  addVehiculo(event) {
    event.preventDefault();
    if (this.formVehiculo.valid) {
      
      //Guardar
      if (this.car._id == undefined || this.car._id == null ) {
        const newCar: Vehiculo = {
          typecar: this.car.typecar,
          placa: this.car.placa,
          descripcion: this.car.descripcion
        };
        
        this.transService.addCars(newCar)
          .subscribe(car => {
            this.cars.push(car);
            this.car._id=null;
            this.car.typecar = '';
            this.car.placa = '';
            this.car.descripcion = null;
            alert("Guardado");
          });
      }else{
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
      this.car= new Vehiculo; 
  
      });
    });

  }
  getCar(updateCar) {
    console.log(updateCar);
    this.car =updateCar;

  }

}
