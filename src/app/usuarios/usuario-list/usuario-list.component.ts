import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { GrupoService } from '../shared/grupo.service';
import { Usuario } from '../../models/usuario'
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  modalText = '';
  display = 'none';
  displayForm = 'none';
  private itemsByPage = 5;
   numberOfPages = 1;
   currentPage = 1;
   itemsInPage: Array<any> = [];
    grupoList:  Array<any> = [];
   usuarioList:  Array<any> = [];
  grupoSelected: string;
  result: any;
@ViewChild('modalAppUsuario') usuarioComponent: UsuarioComponent;

  constructor(private usuarioService: UsuarioService ,
                private grupoService: GrupoService) { }

  closeResult: string;

  async ngOnInit() {
    this.inicio();


  }



  public async inicio() {
    this.grupoList = await this.grupoService.getAll().toPromise();
    this.grupoSelected = '0';
    this.usuarioList  =  await this.usuarioService.getAll().toPromise();
    this.initItemsInPage();
  }



  setDisplayForm( display: any ) {
    console.log('display:' + display);
    this.displayForm = display;
  }

   async getAllGrupo() {
    this.grupoList  =  await this.grupoService.getAll().toPromise();

    this.initItemsInPage();

  }



  async edit(usuario: Usuario) {
    this.displayForm = 'block';
    this.usuarioComponent.operationType = 'update';
    this.usuarioComponent.setUsuario(usuario);
    this.ngOnInit();

  }

  nuevoUsuario() {

    this.displayForm = 'block';
    this.usuarioComponent.operationType = 'insertar';

  }

   delete(usuario: Usuario) {

    this.usuarioService.delete(usuario).subscribe(( data: any ) => {
      console.log('data :' + data);

      if (data === 1) {
        this.setModalText('Usuario eliminado.');

      } else {
        this.setModalText('Error al eliminar Usuario : ' +  usuario.fcCn);

      }

      this.ngOnInit();
      this.openModal();
    });


  }



  async changeGrupo() {
       var idGrupo = this.grupoSelected;
       this.usuarioList  =  await this.usuarioService.getAllByGrupo(idGrupo).toPromise();
       this.initItemsInPage();
  }

  setModalText(mensaje: string) {
      this.modalText = mensaje;
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


  openModal() {this.display = 'block'; }
  onCloseHandled() { this.display = 'none'; }

}
