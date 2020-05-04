export class Pregunta {
  _id: string;
  publish: boolean;
  pregunta: string;
  modo: string;
  categoria: string;
  respuestas: {respuesta: string, correcta: boolean}[] = [{respuesta:"", correcta:false},{respuesta:"", correcta:false},{respuesta:"", correcta:false},{respuesta:"", correcta:false}];
  pista: string;
  explicacion: string;
}
