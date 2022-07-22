import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.scss']
})
export class MonedasComponent implements OnInit {

  formG = new FormGroup({
    valor: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });

  /** Variable global que almacena sucesion para mostrarla en pantalla */
  sucesion: String[] = [];
  private billetes = [500, 200, 100, 50, 20];
  private monedas = [10, 5, 2, 1];

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
      const num = Number(this.formG.controls.valor.value);
      this.sucesion = this.calculoMonedas(num); 
    } catch (error) {
      this.sucesion = ['Sin elementos, ingrese un valor numérico']; 
    }
  }

  /**
   * Hace el cáculo de las monedas correspondientes a el valor dado y devuelve este calculo en 
   * un array de strings
   * @param valor El valor a calcular
   * @returns Lista de monedas equivalentes a valor
   */
   calculoMonedas(valor: number): String[] {
    const elementos: String[] = [];
    let auxBilletes: number = 0;
    let valorActual: number = 0;
    let valorRestante: number = 0;
    if (valor > 0) {
      valorActual = valor;
      console.log('la cantidad es: ');
      if (valor > 20) {
        for (const b of this.billetes) {
          valorRestante = valorActual % b;
          auxBilletes = Math.floor(valorActual / b);
          if (auxBilletes > 0) {
            elementos.push(auxBilletes + (auxBilletes > 1 ? ' billetes' : ' billete') + ' de $' + b);
          }
          valorActual = valorRestante;
        }
      }
      for (const m of this.monedas) {
        valorRestante = valorActual % m;
        auxBilletes = Math.floor(valorActual / m);
        if (auxBilletes > 0) {
          elementos.push(auxBilletes + (auxBilletes > 1 ? ' monedas' : ' moneda') + ' de $' + m);
        }
        valorActual = valorRestante;
      }
  
    } else {
      elementos.push('Por favor ingrese un valor mayor a 0');
    }
    return elementos;
  }

}
