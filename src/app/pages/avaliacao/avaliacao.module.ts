import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvaliacaoPage } from './avaliacao.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormAvaliacaoPage } from 'src/app/modal/form-avaliacao/form-avaliacao.page';

const routes: Routes = [
    {
        path: '',
        component: AvaliacaoPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AvaliacaoPage, FormAvaliacaoPage],
    entryComponents: [FormAvaliacaoPage]
})
export class AvaliacaoPageModule { }
