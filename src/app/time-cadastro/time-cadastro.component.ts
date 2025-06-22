import { Component } from '@angular/core';
import {TimeService} from '../services/time.service';
import {FormsModule} from '@angular/forms';
import {CriarTimeDTO} from '../dtos/criar-time.dto';

@Component({
  selector: 'app-time-cadastro',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './time-cadastro.component.html',
  styleUrls: ['./time-cadastro.component.css']
})
export class TimeCadastroComponent {
  time: CriarTimeDTO = {nome: '', cidade: '', estado: '', estadio: '' };

  constructor(private timeService: TimeService) {}

  salvar() {
    if (!this.time.nome) {
      alert('Nome é obrigatório');
      return;
    }

    this.timeService.salvar(this.time).subscribe({
      next: () => {
        alert('Time cadastrado com sucesso!');
        this.time = { nome: '', cidade: '', estado: '', estadio: '' };
      },
      error: (err) => {
        alert('Erro ao cadastrar time: ' + err.message);
      },
    });
  }
}
