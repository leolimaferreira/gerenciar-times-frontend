import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {TimeService} from '../services/time';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TimeDTO} from '../dtos/time.dto';

@Component({
  selector: 'app-time-deletar',
  standalone: true,
  imports: [FormsModule, CommonModule, ConfirmDialogModule, ToastModule, ProgressSpinner],
  templateUrl: './time-deletar.component.html',
  styleUrls: ['./time-deletar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TimeDeletarComponent {
  timeId: number | null = null;
  timeEncontrado: TimeDTO | null = null;
  carregando: boolean = false;

  constructor(
    private timeService: TimeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  buscarTime() {
    if (this.timeId === null || isNaN(this.timeId)) {
      this.mostrarErro('Por favor, insira um ID válido');
      return;
    }

    this.carregando = true;
    this.timeEncontrado = null;

    this.timeService.obterPorId(this.timeId).subscribe({
      next: (time) => {
        this.timeEncontrado = time;
        this.carregando = false;
      },
      error: (err) => {
        this.mostrarErro(err.message || 'Erro ao buscar o time');
        this.carregando = false;
      }
    });
  }

  confirmarDelecao() {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja deletar o time ${this.timeEncontrado?.nome}?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.deletarTime()
    });
  }

  deletarTime() {
    if (!this.timeEncontrado?.id) return;

    this.carregando = true;

    this.timeService.delete(this.timeEncontrado.id).subscribe({
      next: () => {
        this.mostrarSucesso('Time deletado com sucesso!');
        this.timeEncontrado = null;
        this.carregando = false;
      },
      error: (err) => {
        this.mostrarErro(err.message || 'Erro ao deletar o time');
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
