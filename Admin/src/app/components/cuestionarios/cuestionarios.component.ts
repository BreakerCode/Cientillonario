import { Component, OnInit } from '@angular/core';
import { Cuestionario } from 'src/app/objects/cuestionario';
import Swal from 'sweetalert2';
import { CuestionariosService } from 'src/app/services/cuestionarios.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {

  cuestionarios: Cuestionario[];

  constructor(private cuestionariosService: CuestionariosService) { }

  ngOnInit(): void {
    this.cargarCuestionarios();
  }

  cargarCuestionarios(): void{
    this.cuestionariosService.getCuestionarios().subscribe(cuestionarios => {
      this.cuestionarios = cuestionarios;
    })
  }

  eliminarCuestionario(cuestionario: Cuestionario): void{
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Desea eliminar la cuestionario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Sí, elimínala!'
    }).then((result) => {
      if (result.value) {
        this.cuestionariosService.delete(cuestionario._id).subscribe( response => {
          
          this.cuestionariosService.getCuestionarios().subscribe(cuestionarios => this.cuestionarios = cuestionarios)
          Swal.fire(
            '¡Eliminada!',
            'La cuestionario ha sido borrada.',
            'success'
          )
        })
      }
    })
  }

}
