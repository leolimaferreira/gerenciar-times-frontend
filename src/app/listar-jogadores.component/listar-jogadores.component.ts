import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogadorService } from '../services/jogador.service';
import { JogadorDTO } from '../dtos/jogador.dto';

@Component({
  selector: 'app-listar-jogadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-jogadores.component.html',
  styleUrls: ['./listar-jogadores.component.css']
})
export class ListarJogadoresComponent implements OnInit {

  jogadores: JogadorDTO[] = [];

  constructor(private jogadorService: JogadorService) {}

  ngOnInit(): void {
    this.jogadorService.buscarTodos().subscribe({
      next: jogadores => this.jogadores = jogadores,
      error: err => console.error('Erro ao buscar jogadores:', err)
    });
  }
}
