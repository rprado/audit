import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCopiaItensPage } from './form-copia-itens.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    { path: '', component: FormCopiaItensPage }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: []
})
export class FormCopiaItensPageModule { }
