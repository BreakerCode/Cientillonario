import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/objects/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';
import Swal from 'sweetalert2';

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

  eliminarPregunta(pregunta: Pregunta): void{
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Desea eliminar la pregunta?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Sí, elimínala!'
    }).then((result) => {
      if (result.value) {
        this.preguntasService.delete(pregunta._id).subscribe( response => {

          this.preguntasService.getPreguntas().subscribe(preguntas => this.preguntas = preguntas)
          Swal.fire(
            '¡Eliminada!',
            'La pregunta ha sido borrada.',
            'success'
          )
        })
      }
    })
  }

}
