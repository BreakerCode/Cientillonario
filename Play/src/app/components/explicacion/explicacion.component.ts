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
    this.puntuacion = localStorage['puntuacion'];
    this.usuario = localStorage.getItem('usuario');
    this.pregunta = JSON.parse(localStorage['preguntas'])[parseInt(localStorage['id'])-1];
    this.modo = localStorage['modo'];
  }

  pasarPregunta():void {
    localStorage['id']=parseInt(localStorage['id'])+1;
  }

  esUltimaPregunta(): boolean{
    if(this.modo=='Arcade'){
      if(localStorage['id'] == JSON.parse(localStorage['preguntas']).length){
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
    if(localStorage["esCorrecta"] == "true"){
      return true;
    } else{
      return false;
    }

  }

}
