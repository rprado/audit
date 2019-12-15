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
    { path: 'avaliacao/:id_posto', loadChildren: './pages/avaliacao/avaliacao.module#AvaliacaoPageModule' },
    { path: 'avaliacao/:id_posto/:id_avaliacao/:data', loadChildren: './pages/avaliacao/avaliacao.module#AvaliacaoPageModule' },

    { path: 'lista-visitas/:id_cliente', loadChildren: './pages/home/home.module#HomePageModule' },
    { path: 'lista-relatorios/:id_cliente', loadChildren: './pages/lista-relatorios/lista-relatorios.module#ListaRelatoriosPageModule' },
    { path: 'relatorios', loadChildren: './pages/relatorios/relatorios.module#RelatoriosPageModule' },
    { path: 'lista-visitas', loadChildren: './pages/lista-visitas/lista-visitas.module#ListaVisitasPageModule' },
    { path: 'lista-visitas/:id_cliente', loadChildren: './pages/home/home.module#HomePageModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
