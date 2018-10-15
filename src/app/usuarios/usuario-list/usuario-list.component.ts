import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  providers: [UsuarioService]
})
export class UsuarioListComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
