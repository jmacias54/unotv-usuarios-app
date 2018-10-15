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
    const usuario = new Usuario();
    usuario.fcCn = form.value.fcCn;
    usuario.fcCorreo =  form.value.fcCorreo;
    usuario.fcUid =  form.value.fcUid;



    this.usuarioService.insert(usuario)
    .subscribe(data => {
      this.resetForm();

    });

  }
}
