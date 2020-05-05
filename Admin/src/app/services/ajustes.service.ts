import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Ajustes } from '../objects/ajustes';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {

  private urlEndPoint:string = 'https://gameserver.centic.ovh/config';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  private token;

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.leerToken();

    this.token = "?token="+authService.userToken;
    console.log(this.token)
  }

  getConfig(): Observable<Ajustes> {
    return this.http.get<Ajustes>(`${this.urlEndPoint}${this.token}`, {headers: this.httpHeaders});
  }

  putConfig(ajustes:Ajustes): Observable<any> {
    return this.http.put<Ajustes>(`${this.urlEndPoint}${this.token}`,ajustes ,{headers: this.httpHeaders});
  }

}
