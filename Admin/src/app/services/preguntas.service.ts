import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../objects/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private urlEndPoint:string = 'https://gameserver.centic.ovh/items?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0xIiwiZ2FtZSI6InVjYW0xIiwidXNlcm5hbWUiOiJ1Y2FtMSIsImlhdCI6MTU4MzI1MzIwM30.YFvtz2A5VFFZWfZ9P0WACurNY7lcE0PL4KTLj8O08H0';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) {
  }

  getPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.urlEndPoint}`, {headers: this.httpHeaders});
  }

}
