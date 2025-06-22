import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TimeService} from '../services/time.service';
import {TimeDTO} from '../dtos/time.dto';

@Component({
  selector: 'app-time-procurar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './time-procurar.component.html',
  styleUrls: ['./time-procurar.component.css']
})
export class TimeProcurarComponent {
  timeId: number | null = null;
  timeEncontrado: TimeDTO | null = null;
  erro: string | null = null;
  carregando: boolean = false;

  constructor(private timeService: TimeService) {}

  obterTime() {
    if (!this.timeId && this.timeId !== 0) {
      this.erro = 'Por favor, insira um ID válido';
      return;
    }
    this.carregando = true;
    this.timeEncontrado = null;
    this.erro = null;

    this.timeService.obterPorId(this.timeId).subscribe({
      next: (time) => {
        this.timeEncontrado = time;
        this.carregando = false;
      },
      error: (err) => {
        this.erro = err.message || 'Erro ao buscar time';
        this.carregando = false;
      }
    });
  }
}
