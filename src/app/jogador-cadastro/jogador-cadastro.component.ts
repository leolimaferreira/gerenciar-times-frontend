import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CriarJogadorDTO} from '../dtos/criar-jogador.dto';
import {JogadorService} from '../services/jogador.service';

@Component({
  selector: 'app-jogador-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jogador-cadastro.component.html',
  styleUrls: ['./jogador-cadastro.component.css']
})
export class JogadorCadastroComponent {
  jogador: CriarJogadorDTO = {nome: '', nascimento: '', posicao: '', valor: 0, pontuacao: 0, timeId: 0}

  constructor(private jogadorService: JogadorService) {}

  salvar() {
    if (!this.jogador.nome) {
      alert('Nome é obrigatório');
      return;
    }

    this.jogadorService.salvar(this.jogador).subscribe({
      next: () => {
        alert('Jogador cadastrado com sucesso!');
        this.jogador = {nome: '', nascimento: '', posicao: '', valor: 0, pontuacao: 0, timeId: 0};
      },
      error: (err) => {
        alert('Erro ao cadastrar jogador: ' + err.message);
      },
    });
  }
}
