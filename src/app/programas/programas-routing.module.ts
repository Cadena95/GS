import { PersonasComponent } from './personas/personas.component';
import { MonedasComponent } from './monedas/monedas.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'fibonacci',
    component: FibonacciComponent
  },
  {
    path: 'monedas',
    component: MonedasComponent
  },
  {
    path: 'personas',
    component: PersonasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramasRoutingModule { }
