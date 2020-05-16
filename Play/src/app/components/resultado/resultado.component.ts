import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Puntos } from 'src/app/objects/puntos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  puntos: Puntos = new Puntos();
  puntuacion: number;
  puntuacionMax: number;
  frase: string;

  constructor(private preguntasService: PreguntasService) { }

  ngOnInit(): void {
    this.puntuacion = localStorage['puntuacion'];
    this.puntuacionMax = localStorage['puntuacionMax'];
    if(this.puntuacion < this.puntuacionMax*0.4){
      this.frase = JSON.parse(localStorage['frases'])[0];
      document.getElementById('frase').className += " text-danger";
    } else if(this.puntuacion < this.puntuacionMax*0.7){
      this.frase = JSON.parse(localStorage['frases'])[1];
      document.getElementById('frase').className += " text-orange";
    } else{
      this.frase = JSON.parse(localStorage['frases']) [2];
      document.getElementById('frase').className += " text-success";
    }

    let percent:number = (this.puntuacion * 100) / this.puntuacionMax
    this.puntos.percent = percent;
    this.preguntasService.enviarPuntos(this.puntos).subscribe(response => {
      if(response!.Message){
        Swal.fire('Envío de puntuación', 'Lo sentimos, esta partida no cuenta', 'warning')
      } else{
        Swal.fire('Envío de puntuación', 'Se ha obtenido '+response!.action+' puntos. Ranking del juego: '+response!.match_ranking+'º posición.\n Puntuación del juego: '+response!.match_score+' puntos.' , 'success')
      }
    })

  }



}
