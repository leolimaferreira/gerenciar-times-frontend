import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';
import {TimeDTO} from '../dtos/time.dto';
import {TimeService} from '../services/time.service';

@Component({
  selector: 'app-time-atualizar',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastModule, ProgressSpinnerModule],
  templateUrl: './time-atualizar.component.html',
  styleUrls: ['./time-atualizar.component.css'],
  providers: [MessageService]
})
export class TimeAtualizarComponent {
  timeId: number | null = null;
  timeOriginal: TimeDTO | null = null;
  timeEditado: Partial<TimeDTO> = {};
  carregando: boolean = false;
  editando: boolean = false;

  constructor(private timeService: TimeService, private messageService: MessageService) {}

  buscarTime() {
    if(!this.timeId) {
      this.mostrarErro('Por favor, insira um ID válido');
      return;
    }

    this.carregando = true;
    this.timeOriginal = null;
    this.timeEditado = {};
    this.editando = false;

    this.timeService.obterPorId(this.timeId).subscribe({
      next: (time) => {
        this.timeOriginal = time;
        this.timeEditado = { ...time };
        this.carregando = false;
      },
      error: (err) => {
        this.mostrarErro(err.message || 'Erro ao buscar time');
        this.carregando = false;
      }
    });
  }

  salvarAlteracoes() {
    if(!this.timeOriginal?.id || !this.timeEditado) return;

    this.carregando = true;

    this.timeService.atualizar(this.timeOriginal.id, this.timeEditado).subscribe({
      next: () => {
        this.mostrarSucesso('Time atualizado com sucesso!');
        this.buscarTime();
        this.editando = false;
      },
      error: (err) => {
        this.mostrarErro(err.message || 'Erro ao atualizar time');
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
