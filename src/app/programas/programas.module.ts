import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramasRoutingModule } from './programas-routing.module';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { MainComponent } from './main/main.component';
import { MonedasComponent } from './monedas/monedas.component';
import { PersonasComponent } from './personas/personas.component';


@NgModule({
  declarations: [
    FibonacciComponent,
    MainComponent,
    MonedasComponent,
    PersonasComponent
  ],
  imports: [
    CommonModule,
    ProgramasRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProgramasModule { }
