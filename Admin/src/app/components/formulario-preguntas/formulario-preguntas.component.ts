import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/objects/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-preguntas',
  templateUrl: './formulario-preguntas.component.html',
  styleUrls: ['./formulario-preguntas.component.css']
})
export class FormularioPreguntasComponent implements OnInit {

  pregunta: Pregunta = new Pregunta();
  preguntaCorrecta: number;

  constructor(private preguntaService: PreguntasService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPregunta();
  }

  cargarPregunta(): void{
    this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.preguntaService.getPregunta(id).subscribe( pregunta => {
            this.pregunta = pregunta;
            pregunta.respuestas.forEach((respuesta, index) => {
              if(respuesta.correcta){
                this.preguntaCorrecta=index
              }
            })
          })
        }
      })
  }

  updatePregunta():void {
    this.pregunta.respuestas.forEach((respuesta, index) => {
      if(index!=this.preguntaCorrecta){
        respuesta.correcta = false;
      } else{
        respuesta.correcta=true;
      }
    })
    this.preguntaService.update(this.pregunta).subscribe(response => {
      this.router.navigate(['/preguntas'])
      Swal.fire('Pregunta editada',`Se ha editado la pregunta con éxito`, 'success')
    });
  }

  crearPregunta():void {
    this.pregunta.respuestas[this.preguntaCorrecta].correcta=true;
    this.preguntaService.create(this.pregunta).subscribe(response => {
      this.router.navigate(['/preguntas'])
      Swal.fire('Nueva Pregunta',`Se ha creado la pregunta con éxito`, 'success')
    });
  }

}
