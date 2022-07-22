import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent implements OnInit {

  formG = new FormGroup({
    elementos: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });

  /** Variable global que almacena sucesion para mostrarla en pantalla */
  sucesion: String = '';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Evento lanzado en el submit del form, valida que el formControl 
   * 'elementos' contenga valor numerico,  caso contrario envía mensaje 
   * de error
   */
  validateInput(){
    try {
      const num = Number(this.formG.controls.elementos.value);
      this.sucesion = this.fibonacci(num); 
    } catch (error) {
      this.sucesion = 'Sin elementos, ingrese un valor numérico'; 
    }
  }

  /**
   * Hace el cáculo de los elementos a mostrar en sucesión y los devuelve en forma de string
   * @param elementos el numero de elementos a mostrar en la sucesión
   * @returns Sucesión calculada
   */
  fibonacci(elementos: number): String {
    /** Empieza con 2 elementos, el parámetro reecibido indica cuantos elementos adicionales a los base serían mostrados */
    const serie = [0, 1]; 
    if (elementos >= 0) {
      for (let i = 0; i < elementos; i++) {
        serie.push(serie[i + 1] + serie[i]);
      }
      return serie.toString();
    } else {
      return 'Sin elementos, ingrese un valor mayor a 0';
    }
  }
  

}
