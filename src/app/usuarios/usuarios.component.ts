import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './shared/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {

  constructor( usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
