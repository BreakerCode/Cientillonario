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
  puntuacion: number;
  tiempo: number;
  tiempoActual: number;
  usuario: string;
  id: number;
  idSiguiente: number;
  pregunta: Pregunta = new Pregunta();
  disabledBomba: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.puntuacion = localStorage['puntuacion'];
    this.tiempo = localStorage['tiempo'];
    this.tiempoActual = this.tiempo;
    this.tiempoActual++;
    this.usuario = localStorage.getItem('usuario');
    if(localStorage['usedBomba']=='true'){
      this.disabledBomba = true;
      document.getElementById("bomba").setAttribute("style", "opacity: 0.5;")
    } else{
      this.disabledBomba = false;
    }
    this.cargarPregunta();
    this.updateClock();

  }

  updateClock(): void{
    if(this.tiempoActual != -1){
      if(this.tiempoActual==0){
        localStorage['esCorrecta'] = false;
        this.router.navigate(['/explicacion'])
      }else{
        this.tiempoActual-=1;
        setTimeout( () =>{
          this.updateClock()
        } , 1000)
      }
    }
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
    let duracion = this.tiempoActual;
    this.tiempoActual = -1
    if(respuesta.correcta){
      let puntuacionPregunta: number = localStorage['puntuacionPregunta'];
      let tiempoPorcentaje = duracion / this.tiempo;
      if(tiempoPorcentaje < 0.33){
        puntuacionPregunta = puntuacionPregunta * 0.5;
      } else if(tiempoPorcentaje < 0.66){
        puntuacionPregunta = puntuacionPregunta * 0.75;
      }
      puntuacionPregunta = Math.round(puntuacionPregunta);
      localStorage['puntuacion'] = Number(this.puntuacion) + Number(puntuacionPregunta);
    }
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
      document.getElementById("bomba").setAttribute("style", "opacity: 0.5;")
      localStorage['usedBomba'] = this.disabledBomba;
    }
  }

  bombilla(){
    if(!this.pregunta.pista.isImagen){
      document.getElementById("pistaImagen").style.display = "none";
      document.getElementById("pistaTexto").style.display = "block";
    } else{
      document.getElementById("pistaImagen").setAttribute("src", this.pregunta.pista.pista);
    }
    document.getElementById("bombilla").style.opacity = "0.5";
    document.getElementById("bombilla").setAttribute('disabled', 'disabled');
  }


}
