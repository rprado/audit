import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelperPage } from './helper.page';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: HelperPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HelperPage]
})
export class HelperPageModule { }
