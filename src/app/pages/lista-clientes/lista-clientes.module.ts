import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaClientesPage } from './lista-clientes.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ListaClientesPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaClientesPage]
})
export class ListaClientesPageModule {}
