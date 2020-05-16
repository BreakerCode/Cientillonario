import { Injectable } from '@angular/core';
import { Cuestionario } from '../objects/cuestionario';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuestionariosService {

  private urlEndPoint:string = 'https://gameserver.centic.ovh/items';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  private token;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = "?token="+authService.leerToken();
  }

  create(cuestionario: Cuestionario): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}${this.token}`, cuestionario, {headers: this.httpHeaders})
  }

  update(cuestionario: Cuestionario): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cuestionario._id}${this.token}`, cuestionario, {headers: this.httpHeaders})
  }

  delete(id): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}${this.token}`, {headers: this.httpHeaders});
  }

  getCuestionario(id): Observable<Cuestionario>{
    return this.http.get<Cuestionario>(`${this.urlEndPoint}/${id}${this.token}`);
  }

  getCuestionarios(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(`${this.urlEndPoint}${this.token}`, {headers: this.httpHeaders}).pipe(
      map( cuestionarios => cuestionarios.filter(cuestionario => cuestionario.titulo != null) )
    )
  }

}
