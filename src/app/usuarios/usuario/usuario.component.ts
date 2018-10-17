import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { NgForm } from '@angular/forms';
import { Output , EventEmitter , ViewChild , ElementRef} from '@angular/core';
import { Usuario } from '../../models/usuario'
import { GrupoService } from '../shared/grupo.service';
import { UsuarioListComponent } from '../usuario-list/usuario-list.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  @Output() onchange: EventEmitter<any> = new EventEmitter();
  @Output() onCloseHandled: EventEmitter<any> = new EventEmitter();
  @Output() setModalText: EventEmitter<any> = new EventEmitter();
  @Output() openModal: EventEmitter<any> = new EventEmitter();
  @Output() setDisplayForm: EventEmitter<any> = new EventEmitter();

  operationType: any;
  grupoList:  Array<any> = [];
  grupoSelected: string ;
  selectedUsuario: any ;
  usuarioListComponent: UsuarioListComponent;
  checkedGroup: Array<any> = [];

  constructor( public usuarioService: UsuarioService,
    private grupoService: GrupoService) {
   }




  async ngOnInit() {
    this.resetForm();
    this.grupoList = await this.grupoService.getAll().toPromise();
  }

  checkValue(grupo: any) {
    console.log(grupo);

  }


  resetForm() {
      this.selectedUsuario = new  Usuario();
      this.setDisplayForm.emit('none') ;
}

  setUsuario(usuario: Usuario) {
    this.selectedUsuario = usuario;
  }


  onSubmit(form: NgForm) {


    this.checkedGroup = this.grupoList.filter(item => item.checked === true );

    let checkedGroupStr = '';
    for ( let i = 0 ; i < this.checkedGroup.length ; i ++) {
            checkedGroupStr = checkedGroupStr + this.checkedGroup[i].fcIdGrupo + ',';

    }

    console.log(checkedGroupStr);


    const usuario = this.usuarioService.generarUsuario(form);
    usuario.fcIdGrupo = checkedGroupStr;

    if ( this.operationType === 'insertar' ) {
        this.insertar(usuario);
    } else if ( this.operationType === 'update' ) {
      this.actualizar(usuario);
    }

    this.setDisplayForm.emit('none') ;
    form.reset();

  }



  insertar (usuario: Usuario) {

    this.usuarioService.insert(usuario)
    .subscribe(( data: any ) => {
      console.log('data :' + data);

      if (data === 1) {

        this.selectedUsuario = new  Usuario();
        this.setModalText.emit('Usuario insertado.');
        this.openModal.emit();
      } else if ( data.search('Duplicate entry') > 0 ) {
        this.setModalText.emit('Usuario ó UID duplicado.');
        this.openModal.emit();
      } else {
        this.setModalText.emit('Error al insertar Usuario : ' + this.selectedUsuario.fcCn);
        this.openModal.emit();
      }

       this.onchange.emit();

    });

  }

  actualizar (usuario: Usuario) {


    this.usuarioService.update(usuario)
    .subscribe(( data: any ) => {
      console.log('data :' + data);

      if (data === 1) {

        this.selectedUsuario = new  Usuario();
        this.setModalText.emit('Usuario Actualizado.');
        this.openModal.emit();
      } else if ( data.search('Duplicate entry') > 0 ) {
        this.setModalText.emit('Usuario ó UID duplicado.');
        this.openModal.emit();
      } else {
        this.setModalText.emit('Error al actualizar Usuario : ' + this.selectedUsuario.fcCn);
        this.openModal.emit();
      }

       this.onchange.emit();

    });

  }
}
