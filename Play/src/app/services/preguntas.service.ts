import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Puntos } from '../objects/puntos';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private invitation: string;
  private validation: string;

  private urlEndPoint:string = 'https://gameserver.centic.ovh/games/';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) {
    this.invitation = sessionStorage.getItem('invitation');
    this.validation = sessionStorage.getItem('validation');
  }

  obtenerInfo(): Observable<any>{
    if(!this.invitation || !this.validation){
      this.invitation = sessionStorage.getItem('invitation');
      this.validation = sessionStorage.getItem('validation');
    }
     return this.http.get<any>(this.urlEndPoint+'info', {headers: this.httpHeaders.append('invitation', this.invitation)});
  }

  enviarPuntos(puntos: Puntos): Observable<any>{
   puntos.invitation = this.invitation;
   puntos.validation = this.validation;
   return this.http.post<any>(this.urlEndPoint+'send_points', puntos, {headers: this.httpHeaders});
  }

}
