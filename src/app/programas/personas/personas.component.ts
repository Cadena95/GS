import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/Persona';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  /** todas las personas agregadas */
  personas: Persona[] = [];
  /** las ultimas 10 personas agregadas */
  personasTabla: Persona[] = [];

  /** numero de personas con salario menor a 4000 */
  salarioMenor: number = 0;
  /** numero de personas con salario mayor a 4000 */
  salarioMayor: number = 0;

  /** Numero de personas con menos de 36 horas semanales */
  horarioMayor: number = 0;
  /** Numero de personas con mas de 36 horas semanales */
  horarioMenor: number = 0;

  formG = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Valida formulario y define si se procede con add de registro de persona
   */
  validateInput(): void {
    if (this.formG.valid) {
      try {
        const nombre = this.formG.controls.nombre.value;
        if (nombre) {
          this.personas.push(
            new Persona(
              nombre,
              this.generarSexo(nombre),
              this.generarSalario(),
              this.generarHorasSemana()
            )
          );

        }
        this.ultimosDiez();
        this.calcularIndicadores();
      } catch (error) {

      }
      this.formG.controls.nombre.setValue(null);
      console.log(this.personasTabla);
      console.log(this.horarioMayor);
      console.log(this.horarioMenor);
      
    }
  }

  /**
   * Toma los ultimos diez registros de personas para mostrarlos en pantalla
   */
  ultimosDiez(): void {
    this.personasTabla = this.personas.slice(-10);
  }


  /**
   * recorre array de personas para calcular indicadores
   */
  calcularIndicadores(): void {
    this.indicadoresSalarios();
    this.indicadoresHorarios();
  }

  /**
 * recorre array de personas para calcular indicadores de salarios
 */
  indicadoresSalarios(): void {
    let salarioMenor = 0;
    let salarioMayor = 0;
    if (this.personas) {
      for (const p of this.personasTabla) {
        this.calcSalario(p.salario) ? salarioMenor += 1 : null;
        !this.calcSalario(p.salario) ? salarioMayor += 1 : null;
      }
    }
    this.salarioMayor = salarioMayor;
    this.salarioMenor = salarioMenor;
  }

  /**
 * recorre array de personas para calcular indicadores de horarios
 */
  indicadoresHorarios(): void {
    let horarioMenor = 0;
    let horarioMayor = 0;
    if (this.personas) {
      for (const p of this.personasTabla) {
        this.calcHorario(p.horasSemana) ? horarioMenor += 1 : null;
        !this.calcHorario(p.horasSemana) ? horarioMayor += 1 : null;
      }
    }
    this.horarioMenor = horarioMenor;
    this.horarioMayor = horarioMayor;
  }

  /**
   * Compara si valor recibido es menor a 4000 o no
   * Si se cumple condicion retorna true, caso contrario retorna false
   * @param salario salario de persona
   * @returns si salario es menor a 4000 o no
   */
  calcSalario(salario: number): boolean {
    return salario < 4000;
  }

  /**
   * Compara si valor recibido es menor a 36 o no
   * Si se cumple condicion retorna true, caso contrario retorna false
   * @param salario salario de persona
   * @returns si salario es menor a 36 o no
   */
  calcHorario(horario: number): boolean {
    return horario < 36;
  }


  /**
   * Con base a última letra del nombre recibido, devuelve que sexo debería tener segun el nombre
   * Si termina en 'a', devuelve 'Femenino', caso contrario devuelve masculino
   * @param nombre El nombre recibido
   * @returns el sexo generado 
   */
  generarSexo(nombre: String): String {
    return nombre[nombre.length - 1].toLowerCase() == 'a' ? 'Femenino' : 'Masculino';
  }

  /**
   * Retorna numero aleatorio como salario de nueva persona
   * @returns salario
   */
  generarSalario() {
    return this.getRandomValue(1500, 8000);
  }

  /**
   * Retorna numero aleatorio como horas por semana de nueva persona
   * @returns horas por semana
   */
  generarHorasSemana() {
    return this.getRandomValue(20, 48);
  }

  /**
   * Devuelve valor aleatorio entre los parametros especificados
   * @param minValue el valor minimo que puede devolver
   * @param maxValue eñ valor máximo que puede devolver
   * @returns numero aleatorio generado
   */
  getRandomValue(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }

  /**
   * Retorna porcentaje redondeado calculado entre un valor y su total
   * @param valor dividendo de la operacion
   * @param divisor el total de registros para calculo
   * @returns porcentaje redondeado
   */
  calcularPorcentaje(valor: number, divisor: number) {
    return Number(((valor / divisor) * 100).toFixed(2));
  }

}
