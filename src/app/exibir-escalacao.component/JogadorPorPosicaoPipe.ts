import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jogadorPorPosicao', standalone: true })
export class JogadorPorPosicaoPipe implements PipeTransform {
  transform(jogadores: any[], posicao: string): any[] {
    return jogadores.filter(j => j.posicao === posicao);
  }
}
