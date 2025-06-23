import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {CommonModule} from '@angular/common';
import {TimeDTO} from '../dtos/time.dto';
import {JogadorDTO} from '../dtos/jogador.dto';
import {JogadorService} from '../services/jogador.service';
import {TimeService} from '../services/time.service';
import {AtualizarJogadorDTO} from '../dtos/atualizar-jogador.dto';

@Component({
  selector: 'app-jogador-atualizar',
  standalone: true,
  imports: [
    FormsModule,
    ProgressSpinnerModule,
    ToastModule,
    CommonModule
  ],
  templateUrl: './jogador-atualizar.component.html',
  styleUrls: ['./jogador-atualizar.component.css'],
  providers: [MessageService]
})
export class JogadorAtualizarComponent {
  jogadorId: number | null = null;
  jogadorOriginal: JogadorDTO | null = null;
  jogadorEditado: Partial<AtualizarJogadorDTO> = {};
  carregando: boolean = false;
  editando: boolean = false;

  constructor(private jogadorService: JogadorService, private timeService: TimeService, private messageService: MessageService) {}

  buscarJogador() {
    if(!this.jogadorId) {
      this.mostrarErro('Por favor, insira um ID válido');
      return;
    }

    this.carregando = true;
    this.jogadorOriginal = null;
    this.jogadorEditado = {};
    this.editando = false;

    this.jogadorService.obterPorId(this.jogadorId).subscribe({
      next: (jogador) => {
        this.jogadorOriginal = jogador;
        this.jogadorEditado = { ... jogador}
        this.carregando = false;
      },
      error: (err) => {
        this.mostrarErro(err.message || 'Erro ao buscar jogador');
        this.carregando = false;
      }
    });

    /*if (!this.jogadorEditado?.timeId) return;

    this.timeService.obterPorId(this.jogadorEditado.timeId).subscribe({
      next: (time) => {
        this.jogadorEditado.timeId = time.id;
      },
      error: (err) => {
        console.error('Erro ao carregar time:', err);
      }
    });*/
  }

  salvarAlteracoes() {
    if(!this.jogadorOriginal?.id || !this.jogadorEditado) return;

    if (!this.jogadorEditado.timeId) {
      this.mostrarErro('O time é obrigatório');
      return;
    }

    this.carregando = true;

    const dadosAtualizacao: AtualizarJogadorDTO = {
      nome: this.jogadorEditado.nome || this.jogadorOriginal.nome,
      nascimento: this.jogadorEditado.nascimento || this.jogadorOriginal.nascimento,
      posicao: this.jogadorEditado.posicao || this.jogadorOriginal.posicao,
      valor: this.jogadorEditado.valor || this.jogadorOriginal.valor,
      pontuacao: this.jogadorEditado.pontuacao || this.jogadorOriginal.pontuacao,
      timeId: this.jogadorEditado.timeId
    };

    this.jogadorService.atualizar(this.jogadorOriginal.id, dadosAtualizacao).subscribe({
      next: () => {
        this.mostrarSucesso('Jogador atualizado com sucesso!');
        this.buscarJogador();
        this.editando = false;
      },
      error: (err) => {
        this.mostrarErro(err.message || 'Erro ao atualizar jogador');
        this.carregando = false;
      }
    });
  }

  private mostrarSucesso(mensagem: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem
    })
  }

  private mostrarErro(mensagem: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem
    })
  }
}
