import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { Usuario } from '../../models/usuario'

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  providers: [UsuarioService]
})
export class UsuarioListComponent implements OnInit {
  private itemsByPage = 10;
  numberOfPages = 1;
  currentPage = 1;
  itemsInPage: Array<any> = [];

  usuarioList:  Array<any> = [];
  constructor(private usuarioService: UsuarioService) { }

  async ngOnInit() {
    this.getAllUsuarios();
    this.initItemsInPage();

  }

  async getAllUsuarios() {
    this.usuarioList  =  await this.usuarioService.getAll().toPromise();

    this.initItemsInPage();

  }

  delete(usuario: Usuario): void {
    this.usuarioList = this.usuarioList.filter(u => u !== usuario);
    this.usuarioService.delete(usuario).subscribe();
  }


  private initItemsInPage() {
    if (this.usuarioList.length === 0) {
      this.itemsInPage = [];
      this.numberOfPages = 1;
    } else {
      this.numberOfPages = Math.ceil(this.usuarioList.length / this.itemsByPage);
      this.showDataPage(1);
    }
  }

  showDataPage(page) {
    this.currentPage = page;
    var init = this.itemsByPage * (page - 1);
    var end = this.itemsByPage * page;
    if (init > this.usuarioList.length) return;
    this.itemsInPage = [];
    for (var i = init; i < end && i < this.usuarioList.length; i++ ) {
      this.itemsInPage.push(this.usuarioList[i]);
    }
  }

  range(init, end) {
    var array = [];
    for (var i = init; i < end; i++) {
      array.push(i);
    }
    return array;
  }

}
