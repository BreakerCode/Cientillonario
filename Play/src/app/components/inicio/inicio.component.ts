import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Pregunta } from 'src/app/objects/pregunta';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  modo: string;
  dificultad: string;
  explicacion: string;

  constructor(private activatedRoute: ActivatedRoute, private preguntasService: PreguntasService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let invitation = params['invitation']
      let validation = params['validation']

      if(invitation && validation){
        localStorage.setItem('invitation', invitation);
        localStorage.setItem('validation', invitation);
      }
      localStorage['id']=1;
      this.preguntasService.obtenerInfo().subscribe(info=>{
          this.modo = info.config.modo;
          this.crearExplicación();
          this.dificultad = info.config.dificultad;
          localStorage['usuario'] = info.data.user.nickname;
          localStorage['puntuacionMax'] = info.config.puntuacionMax;
          localStorage['puntuacion'] = 0;
          localStorage['tiempo'] = info.config.tiempo;
          var preguntas: Pregunta[] = info.items
          preguntas = preguntas.filter(pregunta => (<string[]>info.config.preguntas).includes(pregunta._id))
          localStorage['preguntas'] =  JSON.stringify(preguntas);
          localStorage['puntuacionPregunta'] = info.config.puntuacionMax / preguntas.length;
          localStorage['frases'] = JSON.stringify(info.config.frases);
          localStorage['modo'] = info.config.modo;
      })
    })
  }

  crearExplicación():void{
    if(this.modo == 'Arcade'){
      this.explicacion = "En este modo Arcade, deberás jugar hasta contestar todas las preguntas para obtener los puntos."
    } else{
        this.explicacion = "En este modo Survival, si fallas una pregunta se terminará el juego, se te darán los puntos correspondientes a las preguntas acertadas."
    }
  }

}
