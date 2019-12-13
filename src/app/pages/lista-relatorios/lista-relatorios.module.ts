import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaRelatoriosPage } from './lista-relatorios.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ListaRelatoriosPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaRelatoriosPage]
})
export class ListaRelatoriosPageModule {}
