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
  cuestionario: Cuestionario;
  correcto: boolean;

  constructor(private activatedRoute: ActivatedRoute, private preguntasService: PreguntasService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let invitation = params['invitation']
      let validation = params['validation']
      let idCuestionario = params['cuestionario']

      if(invitation && validation && idCuestionario){
        localStorage.setItem('invitation', invitation);
        localStorage.setItem('validation', invitation);
        this.correcto = true;
        localStorage['id']=1;

        this.preguntasService.obtenerInfo().subscribe(info=>{
          this.cuestionario = info.items.find(item => item._id==idCuestionario)
          if(this.cuestionario == null){
            this.correcto = false;
          } else{
            this.crearExplicación();

            localStorage['usuario'] = info.data.user.nickname;
            localStorage['puntuacionMax'] = info.config.puntuacionMax;
            localStorage['puntuacion'] = 0;
            localStorage['tiempo'] = this.cuestionario.tiempo;
            let preguntas: Pregunta[];
            preguntas = info.items.filter(pregunta => (<string[]>this.cuestionario.preguntas).includes(pregunta._id))
            localStorage['preguntas'] =  JSON.stringify(preguntas);
            localStorage['puntuacionPregunta'] = info.config.puntuacionMax / preguntas.length;
            localStorage['frases'] = JSON.stringify(info.config.frases);
            localStorage['modo'] = this.cuestionario.modo;
          }
        })

      }else{
        this.correcto = false;
      }
    })
  }

  crearExplicación():void{
    if(this.cuestionario.modo == 'Arcade'){
      this.explicacion = "En este modo Arcade, deberás jugar hasta contestar todas las preguntas para obtener los puntos."
    } else{
        this.explicacion = "En este modo Survival, si fallas una pregunta se terminará el juego, se te darán los puntos correspondientes a las preguntas acertadas."
    }
  }

}
