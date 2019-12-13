import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaVisitasPage } from './lista-visitas.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: ListaVisitasPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ListaVisitasPage]
})
export class ListaVisitasPageModule { }
