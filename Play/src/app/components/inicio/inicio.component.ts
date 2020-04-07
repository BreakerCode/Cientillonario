import { Component, OnInit } from '@angular/core';
import { Credenciales } from '../credenciales';
import { ActivatedRoute } from '@angular/router';
import { PreguntasService } from '../preguntas/preguntas.service';
import { Preguntas } from '../preguntas/preguntas';

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
    })
  }

  guardarUsuario():void {
    localStorage.setItem('usuario', this.usuario);
  }

}
