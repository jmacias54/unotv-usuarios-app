import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  constructor(  private http: HttpClient,
    private messageService: MessageService ) { }

  base = 'https://dev-unotv.tmx-internacional.net/UNO_MX_WSB_Usuarios/rest/usuarioController/insert';
  selectedUsuario = new Usuario();


/*
  insert( usuario: Usuario) {


   return this.http.post(this.base + '/insert', usuario);
  }*/

  /** POST: add a new hero to the server */
  insert (usuario: Usuario): Observable<Usuario> {

    console.log(JSON.stringify(usuario));
    return this.http.post<Usuario>(this.base , usuario, httpOptions).pipe(
      tap((usuario: Usuario) => this.log(`added hero w/ id=${usuario.fcCn}`)),
      catchError(this.handleError<Usuario>('addHero'))
    );
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
