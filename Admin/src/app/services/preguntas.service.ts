import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../objects/pregunta';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private urlEndPoint:string = 'https://gameserver.centic.ovh/items';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  private token;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = "?token="+authService.leerToken();
  }

  create(pregunta: Pregunta): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}${this.token}`, pregunta, {headers: this.httpHeaders})
  }

  update(pregunta: Pregunta): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${pregunta._id}${this.token}`, pregunta, {headers: this.httpHeaders})
  }

  delete(id): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}${this.token}`, {headers: this.httpHeaders});
  }

  getPregunta(id): Observable<Pregunta>{
    return this.http.get<Pregunta>(`${this.urlEndPoint}/${id}${this.token}`);
  }

  getPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.urlEndPoint}${this.token}`, {headers: this.httpHeaders}).pipe(
      map( preguntas => preguntas.filter(pregunta => pregunta.pregunta != null) )
    );
  }

}
