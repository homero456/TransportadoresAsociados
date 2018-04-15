import { Component, OnInit } from '@angular/core';
//componentes de form
// Esta linea fue agregada automaticamente pueden borrarlo
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {


  form: FormGroup;
  users = [];
  user = new Usuario();
  constructor(private fb: FormBuilder) {
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

  addUsuario() {
    
    if (this.form.valid) {

      this.users.push(this.user);
      
    }else
    {

    }
  }

}
