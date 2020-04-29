import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/objects/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  preguntas: Pregunta[];

  constructor(private preguntasService: PreguntasService) { }

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas(): void{
    this.preguntasService.getPreguntas().subscribe(preguntas => {
      this.preguntas = preguntas;
    })
  }

}
