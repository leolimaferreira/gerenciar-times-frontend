import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cadastro-time',
        loadComponent: () => import('./time-cadastro/time-cadastro.component').then(m => m.TimeCadastroComponent)
    },
    {
        path: 'procurar-time',
        loadComponent: () => import('./time-procurar/time-procurar.component').then(m => m.TimeProcurarComponent)
    },
    {
        path: 'deletar-time',
        loadComponent: () => import('./time-deletar/time-deletar.component').then(m => m.TimeDeletarComponent)
    }
];
