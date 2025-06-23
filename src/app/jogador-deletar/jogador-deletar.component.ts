import {Component} from '@angular/core';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {JogadorDTO} from '../dtos/jogador.dto';
import {JogadorService} from '../services/jogador.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-jogador-deletar',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    FormsModule,
    CommonModule,
    ProgressSpinner,
    ToastModule
  ],
  templateUrl: './jogador-deletar.component.html',
  styleUrls: ['./jogador-deletar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class JogadorDeletarComponent {
  jogadorId: number | null = null;
  jogadorEncontrado: JogadorDTO | null = null;
  carregando: boolean = false;

  constructor(
    private jogadorService: JogadorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  buscarJogador() {
    if(this.jogadorId === null || isNaN(this.jogadorId)) {
      this.mostrarErro("Por favor, insiar um ID válido");
      return;
    }

    this.carregando = true;
    this.jogadorEncontrado = null;

    this.jogadorService.obterPorId(this.jogadorId).subscribe({
      next: (jogador) => {
        this.jogadorEncontrado = jogador;
        this.carregando = false;
      },
      error: (err) => {
        this.mostrarErro(err.message || 'Erro ao buscar o jogador');
        this.carregando = false;
      }
    });
  }

  confirmarDelecao() {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja deletar o jogador ${this.jogadorEncontrado?.nome}?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.deletarJogador()
    });
  }

  deletarJogador() {
    if (!this.jogadorEncontrado?.id) return;

    this.carregando = true;

    const timeoutId = setTimeout(() => {
      this.carregando = false;
      this.mostrarErro('Tempo excedido na requisição');
    }, 10000);

    this.jogadorService.delete(this.jogadorEncontrado.id).subscribe({
      next: () => {
        this.mostrarSucesso('Jogador deletado com sucesso!');
        this.jogadorEncontrado = null;
        this.carregando = false;
      },
      error: (err) => {
        this.mostrarErro(err.message || 'Erro ao deletar o jogador');
        this.carregando = false;
      }
    });
  }

  private mostrarSucesso(mensagem: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem
    });
  }

  private mostrarErro(mensagem: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem
    });
  }
}
