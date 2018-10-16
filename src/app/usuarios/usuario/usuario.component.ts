import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {
  // selectedUsuario: any;

  constructor( public usuarioService: UsuarioService) {
    // this.selectedUsuario =  usuarioService.selectedUsuario;
   }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.usuarioService.selectedUsuario = new  Usuario();
    }

  }


  onSubmit(form: NgForm) {
    const usuario = this.usuarioService.generarUsuario(form);

    this.usuarioService.insert(usuario)
    .subscribe(( data: any ) => {
      console.log('data :' + data);

      if (data === 1) {
        form.reset();
        this.usuarioService.selectedUsuario = new  Usuario();
      } else if ( data.search('Duplicate entry') > 0 ) {
        alert('Usuario ó UID duplicado.');
      } else {
        alert('Error al insertar Usuario : ' + this.usuarioService.selectedUsuario.fcCn);
      }


    });

  }
}
