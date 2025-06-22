import {TimeDTO} from './time.dto';

export interface JogadorDTO {
  id: number,
  nascimento: string,
  nome: string,
  posicao: string,
  valor: number,
  pontuacao: number,
  time: TimeDTO
}
