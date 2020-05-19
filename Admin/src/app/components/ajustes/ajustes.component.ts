import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/objects/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CuestionariosService } from 'src/app/services/cuestionarios.service';
import { Cuestionario } from 'src/app/objects/cuestionario';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  cuestionario: Cuestionario = new Cuestionario();
  preguntas: Pregunta[];
  preguntasFiltradas: Pregunta[];

  constructor(private preguntasService: PreguntasService, private cuestionariosService: CuestionariosService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarCuestionario();

  }

  //CARGAR CUESTIONARIO
  cargarCuestionario(): void{
    this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.cuestionariosService.getCuestionario(id).subscribe( cuestionario => {
            this.cuestionario = cuestionario;
          })
        }
        this.preguntasService.getPreguntas().subscribe(preguntas => {
          this.preguntas = preguntas
          this.filtrarPreguntas();
        })
      })
  }

  //Saber si la pregunta se encuentra incluida en el cuestionario
  incluida(id: string): boolean{
    if(this.cuestionario.preguntas.includes(id)){
      return true;
    } else{
      return false;
    }
  }

  //Se filtran las preguntas según la dificultad elegida
  filtrarPreguntas(): void{
    if(this.cuestionario.dificultad == "Ambas"){
      this.preguntasFiltradas = this.preguntas
    }else{
      this.preguntasFiltradas=this.preguntas.filter(pregunta => pregunta.modo == this.cuestionario.dificultad)
    }
  }

  //Al cambiar la dificultad se filtran las preguntas
  cambioDificultad(): void{
    this.cuestionario.preguntas=[];
    this.filtrarPreguntas();
  }

  //Se incluye la pregunta al cuestionario
  addPregunta(id: string): void{
    this.cuestionario.preguntas.push(id)
  }

  //SE BORRA LA PREGUNTA AL CUESTIONARIO
  deletePregunta(id: string): void{
    let index = this.cuestionario.preguntas.indexOf(id);
    this.cuestionario.preguntas.splice(index, 1);
  }

  //SE CREA EL CUESTIONARIO
  createCuestionario(): void{
    let valid: boolean = true;
    this.cuestionario.titulo = this.cuestionario.titulo.trim();
    if(this.cuestionario.titulo.length==0){
      valid = false;
    }

    if(valid){
      this.cuestionariosService.create(this.cuestionario).subscribe(response => {
        this.router.navigate(['/cuestionarios'])
        Swal.fire('Nuevo Cuestionario',`Se ha creado el cuestionario con éxito`, 'success')
      });
    }
  }

  //SE EDITA EL CUESTIONARIO
  updateCuestionario(): void{
    let valid: boolean = true;
    this.cuestionario.titulo = this.cuestionario.titulo.trim();
    if(this.cuestionario.titulo.length==0){
      valid = false;
    }

    if(valid){
      this.cuestionariosService.update(this.cuestionario).subscribe(response => {
        this.router.navigate(['/cuestionarios'])
        Swal.fire('Cuestinario editado',`Se ha editado el cuestionario con éxito`, 'success')
      });
    }
  }

}
