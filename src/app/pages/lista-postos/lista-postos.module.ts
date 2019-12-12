import { FormPostoPage } from './../../modal/form-posto/form-posto.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPostosPage } from './lista-postos.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ListaPostosPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaPostosPage, FormPostoPage],
  entryComponents: [FormPostoPage]
})
export class ListaPostosPageModule {}
