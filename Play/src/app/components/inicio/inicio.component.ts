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

 usuario: string;

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
          localStorage['preguntas'] =  JSON.stringify(info.items);
      })
    })
  }

  jugar():void {
    localStorage.setItem('usuario', this.usuario);
  }

}
