import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregunta } from 'src/app/objects/pregunta';
import { Puntos } from 'src/app/objects/puntos';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  usuario: string;
  id: number;
  idSiguiente: number;
  pregunta: Pregunta = new Pregunta();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    this.cargarPregunta();
  }

  cargarPregunta(){
    let id = localStorage['id'];
    if(id){
      this.id = id;
      this.idSiguiente = id;
      this.idSiguiente++;
      this.pregunta = JSON.parse(localStorage['preguntas'])[this.id-1];
    }
    if(id>JSON.parse(localStorage['preguntas']).length){
      this.router.navigate(['inicio'])
    }
  }


}
