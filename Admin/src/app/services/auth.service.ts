import { Injectable } from '@angular/core';
import { Usuario, TokenUsuario } from '../interfaces/usuario-interfaces';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

const URL = environment.url;



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private header = new HttpHeaders().set('Content-Type', 'application/json');

  userToken: string;

  constructor(private http: HttpClient, private router: Router) { }

  async login(user: Usuario): Promise<TokenUsuario>{

    const respuestaAPI = await this.http.post<TokenUsuario>(`${URL}/auth/login`, user,{headers: this.header}).toPromise();

    return respuestaAPI;

  }

  public guardarToken(idToken: string){


    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  public leerToken(){
    if(localStorage.getItem('token') ){

      this.userToken = localStorage.getItem('token');

    } else {

      this.userToken = '';


    }


  }

  public isLogin(): boolean {

    return (this.userToken !== undefined);

  }

  public logout(){

    localStorage.removeItem('token');

  }




}
