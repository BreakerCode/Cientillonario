import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Pregunta } from 'src/app/objects/pregunta';
import { Puntos } from 'src/app/objects/puntos';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  usuario: string;
  id: number;
  idSiguiente: number;
  pregunta :Pregunta = new Pregunta();
  preguntas :Pregunta[];
  puntosTotales: any;
  puntos: Puntos = new Puntos();

  constructor(private preguntasService: PreguntasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    this.cargarPregunta();
  }

  cargarPregunta(){
    this.preguntasService.obtenerInfo().subscribe(info=>{
        this.preguntas=info.items;

        this.activatedRoute.params.subscribe(params => {

          let id:number = params['id']
          if(id){
            this.id = id;
            this.idSiguiente = id;
            this.idSiguiente++;
            this.pregunta = this.preguntas[id-1];
          }
        })
    })
  }

  sumarId():void{
    this.id++;
  }

  esUltimaPregunta(): boolean{
    if(this.id == this.preguntas.length){
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
