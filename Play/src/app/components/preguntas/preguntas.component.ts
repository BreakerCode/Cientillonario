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
  disabledBomba: boolean = false;

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

  comprobarRespuesta(respuesta: any){
    localStorage['esCorrecta'] = respuesta.correcta;
  }

  bomba(){
    if(!this.disabledBomba){
      this.disabledBomba = true;
      var anuladas: number[] = [];
      while(anuladas.length!=2){
        var index = Math.floor(Math.random() * 4)
        var respuesta = this.pregunta.respuestas[index]
        if(!respuesta.correcta && !anuladas.includes(index)){
          anuladas.push(index)
        }
      }

      anuladas.forEach(index => {
        document.getElementById("respuesta"+index).setAttribute('disabled', 'disabled');
      })
    }


  }


}
