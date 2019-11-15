import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
    { path: 'itens', loadChildren: './pages/itens-avalicao/itens-avalicao.module#ItensAvalicaoPageModule' },
    { path: 'clientes', loadChildren: './pages/lista-clientes/lista-clientes.module#ListaClientesPageModule' },
    { path: 'posto/:id', loadChildren: './pages/lista-postos/lista-postos.module#ListaPostosPageModule' },
    { path: 'item-posto/:id', loadChildren: './pages/item-posto/item-posto.module#ItemPostoPageModule' },
    { path: 'avaliacao', loadChildren: './pages/avaliacao-posto/avaliacao-posto.module#AvaliacaoPostoPageModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
