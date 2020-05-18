import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Pregunta } from 'src/app/objects/pregunta';
import { Cuestionario } from 'src/app/objects/cuestionario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  explicacion: string;
  cuestionario: Cuestionario = new Cuestionario();

  //BOOLEAN OBTENCIÓN DE PARAMETROS CORRECTO
  correcto: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private preguntasService: PreguntasService) { }

  ngOnInit(): void {

    //OBTENCIÓN PARÁMETROS URL
    this.activatedRoute.queryParams.subscribe(params => {
      //OBTENCIÓN INVITATION, VALIDATION, CUESTIONARIO
      let invitation = params['invitation']
      let validation = params['validation']
      let idCuestionario = params['collection']

      //VALIDAR QUE SE RECOGEN LOS PARAMETROS
      if(invitation && validation && idCuestionario){
        localStorage.setItem('invitation', invitation);
        localStorage.setItem('validation', validation);
        this.correcto = true;
        //INICIALIZACIÓN INDEX PARA RECORRER PREGUNTAS
        localStorage['id']=1;

        //OBTENCIÓN INFO
        this.preguntasService.obtenerInfo().subscribe(info=>{
          //OBTENCIÓN CUESTIONARIO
          this.cuestionario = info.items.find(item => item._id==idCuestionario)

          //VALIDAR OBTENCION CUESTIONARIO
          if(this.cuestionario == null){
            this.correcto = false;
          } else{
            this.crearExplicación();

            //OBTENCIÓN NICKNAME
            localStorage['usuario'] = info.data.user.nickname;
            //OBTENCIÓN PUNTUACIÓN MÁXIMA
            localStorage['puntuacionMax'] = info.config.puntuacionMax;
            //INICIALIZACIÓN PUNTUACIÓN JUEGO
            localStorage['puntuacion'] = 0;
            //ESTABLECER TIEMPO POR PREGUNTA
            localStorage['tiempo'] = this.cuestionario.tiempo;
            //OBTENCIÓN PREGUNTAS CUESTIONARIO
            let preguntas: Pregunta[];
            preguntas = info.items.filter(pregunta => (<string[]>this.cuestionario.preguntas).includes(pregunta._id))
            localStorage['preguntas'] =  JSON.stringify(preguntas);
            //ESTABLECER PUNTUACIÓN POR PREGUNTA
            localStorage['puntuacionPregunta'] = info.config.puntuacionMax / preguntas.length;
            //ESTABLECER FRASES PARA EL RESULTADO DEL JUEGO
            localStorage['frases'] = JSON.stringify(info.config.frases);
            //ESTABLECER MODO DE JUEGO
            localStorage['modo'] = this.cuestionario.modo;
            //INICIALIZACIÓN BOOLEAN PARA SABER SI SE USÓ COMODÍN BOMBA
            localStorage['usedBomba'] = false;
          }
        })

      }else{
        this.correcto = false;
      }
    })
  }

  //EXPLICACIÓN MODO DE JUEGO
  crearExplicación():void{
    if(this.cuestionario.modo == 'Arcade'){
      this.explicacion = "En este modo Arcade, deberás jugar hasta contestar todas las preguntas para obtener los puntos."
    } else{
        this.explicacion = "En este modo Survival, si fallas una pregunta se terminará el juego, se te darán los puntos correspondientes a las preguntas acertadas."
    }
  }

}
