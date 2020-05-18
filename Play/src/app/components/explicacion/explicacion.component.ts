import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/objects/pregunta';

@Component({
  selector: 'app-explicacion',
  templateUrl: './explicacion.component.html',
  styleUrls: ['./explicacion.component.css']
})
export class ExplicacionComponent implements OnInit {

  modo: string;
  puntuacion: number;
  usuario: string;
  pregunta: Pregunta = new Pregunta();

  constructor() { }

  ngOnInit(): void {
    this.puntuacion = sessionStorage['puntuacion'];
    this.usuario = sessionStorage.getItem('usuario');
    this.pregunta = JSON.parse(sessionStorage['preguntas'])[parseInt(sessionStorage['id'])-1];
    this.modo = sessionStorage['modo'];
  }

  pasarPregunta():void {
    sessionStorage['id']=parseInt(sessionStorage['id'])+1;
  }

  esUltimaPregunta(): boolean{
    if(this.modo=='Arcade'){
      if(sessionStorage['id'] == JSON.parse(sessionStorage['preguntas']).length){
        return true;
      } else{
        return false;
      }
    } else{
      if(!this.esCorrecta()){
        return true;
      }
    }
  }

  esCorrecta(): boolean{
    if(sessionStorage["esCorrecta"] == "true"){
      return true;
    } else{
      return false;
    }

  }

}
