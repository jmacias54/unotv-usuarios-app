import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

const base = 'https://dev-unotv.tmx-internacional.net/UNO_MX_WSB_Usuarios/rest/usuarioController/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  constructor(  private http: HttpClient,
    private messageService: MessageService ) { }


  selectedUsuario = new Usuario();


  insert (usuario: Usuario): Observable<Usuario> {
    console.log(' --- insert [ UsuarioService ] --- ');
    // console.log(JSON.stringify(usuario));
    return this.http.post<Usuario>(base + 'insert', usuario, httpOptions).pipe(
      tap((usuario: Usuario) => this.log(`insert usuario w/ id=${usuario.fcCn}`)),
      catchError(this.handleError<Usuario>('insert'))
    );
  }

    /** POST: update a new hero to the server */
    update (usuario: Usuario): Observable<Usuario> {
      console.log(' --- update [ UsuarioService ] --- ');
      console.log(JSON.stringify(usuario));
      return this.http.post<Usuario>(base + 'update', usuario, httpOptions).pipe(
        tap((usuario: Usuario) => this.log(`insert usuario w/ id=${usuario.fcCn}`)),
        catchError(this.handleError<Usuario>('insert'))
      );
    }



      /** GET heroes from the server */
  public getAll () {
    console.log(' --- getAll [ UsuarioService ] --- ');

       return this.http.post<any>(base, httpOptions)
         .pipe(catchError(this.handleError('getAll')));
   }




     /** GET hero by id. Will 404 if id not found */
  getUsuario(fcUid: number): Observable<Usuario> {
    console.log(' --- getUsuario [ UsuarioService ] --- ');
    const url = `${base}/findByUID/${fcUid}/`;
    return this.http.post<Usuario>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched Usuario fcUid=${fcUid}`)),
      catchError(this.handleError<Usuario>(`getUsuario fcUid=${fcUid}`))
    );
  }


    /** DELETE: delete the hero from the server */
    delete(usuario: Usuario): Observable<Usuario> {

      console.log(' --- delete [ UsuarioService ] --- ');
      return this.http.post<Usuario>(base + 'delete', usuario , httpOptions).pipe(
        tap(_ => this.log(`deleted hero fcUid=${usuario.fcUid}`)),
        catchError(this.handleError<Usuario>('delete'))
      );
    }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error.error.message as T);
     // return error.message;
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`usuarioService: ${message}`);
  }

 generarUsuario (form: NgForm) {

  const usuario = new Usuario();
  usuario.fcCn = form.value.fcCn;
  usuario.fcCorreo =  form.value.fcCorreo;
  usuario.fcUid =  form.value.fcUid;

  return usuario;
}

}
