import { Component, OnInit } from '@angular/core';
//componentes de form
// Esta linea fue agregada automaticamente pueden borrarlo
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../models/Usuario';
import { TransporteServiceService } from '../transporte-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {


  form: FormGroup;
  users = [];
  user = new Usuario();
  constructor(private fb: FormBuilder, private transService: TransporteServiceService) {

    //load data
    transService.getUsers().subscribe(users => {
      this.users = users;

    });

    this.form = fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5)
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5)
      ])],
      typeDocument: ['', Validators.compose([
        Validators.required
      ])],
      documentNumber: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5)
      ])]
    })

  }

  ngOnInit() {
  }

  newUser(){
    this.user._id=null;
    this.user.name = '';
    this.user.lastName = '';
    this.user.typeDocument = null;
    this.user.documentNumber = '';
  }

  addUsuario(event) {
    event.preventDefault();
    if (this.form.valid) {
      
      //Guardar
      if (this.user._id == undefined || this.user._id == null ) {
        const newUser: Usuario = {
          name: this.user.name,
          lastName: this.user.lastName,
          typeDocument: this.user.typeDocument,
          documentNumber: this.user.documentNumber
        };
        console.log(newUser);
        this.transService.addUsers(newUser)
          .subscribe(user => {
            this.users.push(user);
            this.newUser();
            alert("Guardado");
          });
      }else{
        //Update
        console.log(this.user);
        this.updateUser(this.user);

      }
    } else {

    }
  }


  deleteUser(id) {
    const isDelete = confirm("Está segurp de eliminar el registro?");
    if (isDelete) {
      this.transService.deleteUsers(id)
        .subscribe(user => {
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]._id == id) {
              this.users.splice(i, 1);
            }
          }
        });
    }
    return;
  }

  updateUser(user: Usuario) {
    const newUser: Usuario = {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      typeDocument: user.typeDocument,
      documentNumber: user.documentNumber
    };

    this.transService.updateUsers(newUser).subscribe(res => {

      alert("Actualizado");
      this.transService.getUsers().subscribe(users => {
      this.users = users;
      this.user= new Usuario; 
  
      });
    });

  }
  getUser(updateUser) {
    console.log(updateUser);
    this.user =updateUser;

  }

}
