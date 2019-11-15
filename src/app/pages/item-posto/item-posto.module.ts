import { FormCopiaItensPage } from '../../modal/form-copia-itens/form-copia-itens.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemPostoPage } from './item-posto.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormEmailClientePage } from 'src/app/modal/form-email-cliente/form-email-cliente.page';

const routes: Routes = [
    {
        path: '',
        component: ItemPostoPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ItemPostoPage, FormEmailClientePage, FormCopiaItensPage],
    entryComponents: [FormEmailClientePage, FormCopiaItensPage]
})
export class ItemPostoPageModule { }
