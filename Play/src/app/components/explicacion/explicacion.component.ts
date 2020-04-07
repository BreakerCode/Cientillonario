import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import Swal from 'sweetalert2';
import { Puntos } from 'src/app/objects/puntos';
import { Pregunta } from 'src/app/objects/pregunta';

@Component({
  selector: 'app-explicacion',
  templateUrl: './explicacion.component.html',
  styleUrls: ['./explicacion.component.css']
})
export class ExplicacionComponent implements OnInit {

  usuario: string;
  puntos: Puntos = new Puntos();
  pregunta: Pregunta = new Pregunta();

  constructor(private preguntasService: PreguntasService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    this.pregunta = JSON.parse(localStorage['preguntas'])[parseInt(localStorage['id'])-1];
  }

  pasarPregunta():void {
    localStorage['id']=parseInt(localStorage['id'])+1;
  }

  esUltimaPregunta(): boolean{
    if(localStorage['id'] == JSON.parse(localStorage['preguntas']).length){
      return true;
    } else{
      return false;
    }
  }

  mandarPuntuacion(): void{
      this.preguntasService.enviarPuntos(this.puntos).subscribe(response => {
        Swal.fire(
            '¡Puntuación enviada!',
            `Has obtenido puntos`,
            'success'
        )
      })
  }

}
