import { Component, OnInit } from '@angular/core';
import { Ajustes } from 'src/app/objects/ajustes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AjustesService } from 'src/app/services/ajustes.service';
import { Pregunta } from 'src/app/objects/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  ajustes: Ajustes = new Ajustes();
  preguntas: Pregunta[];
  preguntasFiltradas: Pregunta[];

  constructor(private preguntasService: PreguntasService, private ajustesService: AjustesService, private router: Router) {
  }

  ngOnInit(): void {

    this.ajustesService.getConfig().subscribe(ajustes => {
      this.ajustes = ajustes
      this.preguntasService.getPreguntas().subscribe(preguntas => {
        this.preguntas = preguntas
        this.filtrarPreguntas();
      })
    })
  }

  incluida(id: string): boolean{
    if(this.ajustes.preguntas.includes(id)){
      return true;
    } else{
      return false;
    }
  }

  filtrarPreguntas(): void{
    if(this.ajustes.dificultad == "Ambas"){
      this.preguntasFiltradas = this.preguntas
    }else{
      this.preguntasFiltradas=this.preguntas.filter(pregunta => pregunta.modo == this.ajustes.dificultad)
    }
  }

  cambioDificultad(): void{
    this.ajustes.preguntas=[];
    this.filtrarPreguntas();
  }

  addPregunta(id: string): void{
    this.ajustes.preguntas.push(id)
  }

  deletePregunta(id: string): void{
    let index = this.ajustes.preguntas.indexOf(id);
    this.ajustes.preguntas.splice(index, 1);
  }

  guardarCambios(): void{
    this.ajustesService.putConfig(this.ajustes).subscribe(response => {
      this.router.navigate(['/ajustes'])
      Swal.fire('Ajustes guardados',`Se han guardado los ajustes con éxito`, 'success')
    });
  }

}
