import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregunta } from 'src/app/objects/pregunta';

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
    //OBTENCIÓN PUNTUACIÓN ACTUAL
    this.puntuacion = localStorage['puntuacion'];
    //OBTENCIÓN TIEMPO POR PREGUNTA
    this.tiempo = localStorage['tiempo'];
    //TIEMPO CONTADOR
    this.tiempoActual = this.tiempo;
    //OBTENCIÓN NICKNAME
    this.usuario = localStorage.getItem('usuario');
    //DESACTIVAR BOMBA SI YA SE HA USADO
    if(localStorage['usedBomba']=='true'){
      this.disabledBomba = true;
      document.getElementById("bomba").setAttribute("style", "opacity: 0.5;")
    } else{
      this.disabledBomba = false;
    }
    //CARGAR PREGUNTA
    this.cargarPregunta();
    //INICIAR CONTADOR
    this.updateClock();
  }

  updateClock(): void{
    //SE COMPRUEBA SI EL TIEMPO SE HA TERMINADO CADA SEGUNDO
    if(this.tiempoActual != -1){
      //SI HA TERMINADO SE INDICA COMO INCORRECTA LA RESPUESTA Y SE PASA  A LA EXPLICACIÓN
      if(this.tiempoActual==0){
        localStorage['esCorrecta'] = false;
        this.router.navigate(['/explicacion'], { replaceUrl: true })
      }
      //SI NO HA TERMINADO SE RESTA UNO
      else{
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
      this.router.navigate(['inicio'], { replaceUrl: true })
    }

  }

  comprobarRespuesta(respuesta: any){
    //OBTENEMOS EL TIEMPO RESTANTE TRAS CONTESTAR LA PREGUNTA
    let duracion = this.tiempoActual;
    //DETENEMOS EL TIEMPO AL CONTESTAR LA PREGUNTA
    this.tiempoActual = -1
    //COMPROBAMOS SI ES CORRECTA LA RESPUESTA
    if(respuesta.correcta){
      let puntuacionPregunta: number = localStorage['puntuacionPregunta'];
      let tiempoPorcentaje = duracion / this.tiempo;
      //DEPENDIENDO DEL TIEMPO CONSUMIDO, RESTAREMOS PUNTUACIÓN DE LA PREGUNTA
      if(tiempoPorcentaje < 0.33){
        puntuacionPregunta = puntuacionPregunta * 0.5;
      } else if(tiempoPorcentaje < 0.66){
        puntuacionPregunta = puntuacionPregunta * 0.75;
      }
      //REDONDEAMOS LA PUNTUACIÓN PARA QUE NO HAYAN DECIMALES
      puntuacionPregunta = Math.round(puntuacionPregunta);
      //SUMAMOS A LA PUNTUACIÓN TOTAL LA PUNTUACIÓN DE ESTA PREGUNTA.
      localStorage['puntuacion'] = Number(this.puntuacion) + Number(puntuacionPregunta);
    }
    //ESTABLECEMOS SI HEMOS ACERTADO LA RESPUESTA PARA OBTENERLA EN LA EXPLICACIÓN
    localStorage['esCorrecta'] = respuesta.correcta;
  }

  //USO COMODIN BOMBA
  bomba(){
    if(!this.disabledBomba){
      this.disabledBomba = true;
      var anuladas: number[] = [];
      //BUCLE HASTA ANULAR DOS RESPUESTAS
      while(anuladas.length!=2){
        //RECORREMOS LAS RESPUESTAS ALEATOREAMENTE Y SI ES FALSA AÑADIMOS A ANULADAS
        var index = Math.floor(Math.random() * 4)
        var respuesta = this.pregunta.respuestas[index]
        if(!respuesta.correcta && !anuladas.includes(index)){
          anuladas.push(index)
        }
      }
      //RECORREMOS LOS INDEX DE LAS RESPUESTAS ANULADAS Y LAS DESACTIVAMOS
      anuladas.forEach(index => {
        document.getElementById("respuesta"+index).setAttribute('disabled', 'disabled');
      })
      //BAJAMOS OPACIDAD A LA BOMBA TRAS DESACTIVARLA
      document.getElementById("bomba").setAttribute("style", "opacity: 0.5;")
      //INDICAMOS QUE SE HA USADO LA BOMBA.
      localStorage['usedBomba'] = this.disabledBomba;
    }
  }

  //COMODIN BOMBILLA
  bombilla(){
    //SI LA PISTA NO ES UNA IMAGEN, CAMBIAMOS EL DIV DE LA IMAGEN DEL PROFESOR POR EL TEXTAREA CON LA PISTA
    if(!this.pregunta.pista.isImagen){
      document.getElementById("pistaImagen").style.display = "none";
      document.getElementById("pistaTexto").style.display = "block";
    }
    //SI LA PISTA ES UNA IMAGEN, CAMBIAMOS LA IMAGEN DEL PROFESOR POR LA DE LA PISTA
    else{
      document.getElementById("pistaImagen").setAttribute("src", this.pregunta.pista.pista);
    }

    //DESACTIVAMOS Y BAJAMOS LA OPACIDAD A LA BOMBILLA
    document.getElementById("bombilla").style.opacity = "0.5";
    document.getElementById("bombilla").setAttribute('disabled', 'disabled');
  }
}
