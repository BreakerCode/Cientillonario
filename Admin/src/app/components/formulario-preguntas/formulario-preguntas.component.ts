import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/objects/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-preguntas',
  templateUrl: './formulario-preguntas.component.html',
  styleUrls: ['./formulario-preguntas.component.css']
})
export class FormularioPreguntasComponent implements OnInit {

  pregunta: Pregunta = new Pregunta();
  preguntaCorrecta: number;

  constructor(private preguntaService: PreguntasService, private router: Router) { }

  ngOnInit(): void {
  }

  crearPregunta():void {
    this.preguntaService.create(this.pregunta).subscribe(response => {
      this.router.navigate(['/preguntas'])
      Swal.fire('Nueva Pregunta',`Se ha creado la pregunta con éxito`, 'success')
    });
  }

}
