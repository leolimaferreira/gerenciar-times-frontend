import { Component, OnInit } from '@angular/core';
import { JogadorDTO } from '../dtos/jogador.dto';
import { EscalacaoService } from '../services/escalacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-escalacao',
  standalone: true,
  templateUrl: './exibir-escalacao.component.html',
  styleUrls: ['./exibir-escalacao.component.css'],
  imports: [CommonModule]
})
export class EscalacaoComponent implements OnInit {
  cartoletasDisponiveis = 100;
  timeId = 1;

  jogadores: JogadorDTO[] = [];

  posicoes = {
    goleiro: null as JogadorDTO | null,
    zagueiros: [] as JogadorDTO[],
    laterais: [] as JogadorDTO[],
    meias: [] as JogadorDTO[],
    atacantes: [] as JogadorDTO[]
  };

  constructor(private escalacaoService: EscalacaoService) {}

  ngOnInit(): void {
    this.carregarJogadores();
  }

  carregarJogadores() {
    this.escalacaoService.obterJogadoresDoTime(this.timeId).subscribe(jogadores => {
      this.jogadores = jogadores;

      this.posicoes.goleiro = jogadores.find(j => j.posicao === 'Goleiro') || null;
      this.posicoes.zagueiros = jogadores.filter(j => j.posicao === 'Zagueiro');
      this.posicoes.laterais = jogadores.filter(j => j.posicao === 'Lateral');
      this.posicoes.meias = jogadores.filter(j => j.posicao === 'Meia');
      this.posicoes.atacantes = jogadores.filter(j => j.posicao === 'Atacante');
    });
  }

  calcularTotal(): number {
    let total = 0;
    if (this.posicoes.goleiro) total += this.posicoes.goleiro.valor;
    [...this.posicoes.zagueiros, ...this.posicoes.laterais, ...this.posicoes.meias, ...this.posicoes.atacantes]
      .forEach(j => total += j.valor);
    return total;
  }

  salvarEscalacao() {
    alert('Escalação salva com sucesso!');
  }
}
