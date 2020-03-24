import { Component, OnInit } from '@angular/core';
import { Pregunta } from './pregunta';
import { Credenciales } from '../credenciales';
import { PreguntasService } from './preguntas.service';
import { Preguntas } from './preguntas';
import { ActivatedRoute } from '@angular/router';

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
}
