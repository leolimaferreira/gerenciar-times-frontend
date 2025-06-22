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
    },
    {
      path: 'atualizar-time',
      loadComponent: () => import('./time-atualizar/time-atualizar.component').then(m => m.TimeAtualizarComponent)
    },
  {
    path: 'cadastro-jogador',
    loadComponent: () => import('./jogador-cadastro/jogador-cadastro.component').then(m => m.JogadorCadastroComponent)
  },
  {
    path: 'deletar-jogador',
    loadComponent: () => import('./jogador-deletar/jogador-deletar.component').then(m => m.JogadorDeletarComponent)
  },
  {
    path: 'atualizar-jogador',
    loadComponent: () => import('./jogador-atualizar/jogador-atualizar.component').then(m => m.JogadorAtualizarComponent)
  },
  {
    path: 'exibir-escalacao',
    loadComponent: () => import('./exibir-escalacao.component/exibir-escalacao.component').then(m => m.EscalacaoComponent)
  },
  {
    path: 'listar-jogadores',
    loadComponent: () => import('./listar-jogadores.component/listar-jogadores.component').then(m => m.ListarJogadoresComponent)
  }
];
