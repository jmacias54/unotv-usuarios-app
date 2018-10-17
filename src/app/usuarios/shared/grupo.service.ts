import { Injectable } from '@angular/core';
import { Grupo } from '../../models/grupo';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../shared/usuario.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  // URL to web api
  private url = 'https://dev-unotv.tmx-internacional.net/UNO_MX_WSB_Usuarios/rest/grupoController/';
  constructor(private http: HttpClient,
              private messageService: MessageService ) { }


        /** GET Grupos from the server */
        getAll (): Observable<Grupo[]> {
          return this.http.post<Grupo[]>(this.url, httpOptions)
            .pipe(
              tap(grupo => this.log('fetched Grupos')),
              catchError(this.handleError('getAll', []))
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

}
