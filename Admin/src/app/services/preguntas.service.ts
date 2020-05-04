import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../objects/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private urlEndPoint:string = 'https://gameserver.centic.ovh/items';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  private token = "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0xIiwiZ2FtZSI6InVjYW0xIiwidXNlcm5hbWUiOiJ1Y2FtMSIsImlhdCI6MTU4MzI1MzIwM30.YFvtz2A5VFFZWfZ9P0WACurNY7lcE0PL4KTLj8O08H0"

  constructor(private http: HttpClient) {
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
    return this.http.get<Pregunta[]>(`${this.urlEndPoint}${this.token}`, {headers: this.httpHeaders});
  }

}
