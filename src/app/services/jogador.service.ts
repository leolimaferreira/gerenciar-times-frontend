import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError, timeout} from 'rxjs';
import {CriarJogadorDTO} from '../dtos/criar-jogador.dto';
import {JogadorDTO} from '../dtos/jogador.dto';
import {TimeDTO} from '../dtos/time.dto';
import {AtualizarTimeDTO} from '../dtos/atualizar-time.dto';
import {AtualizarJogadorDTO} from '../dtos/atualizar-jogador.dto';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  private baseUrl = 'http://localhost:8080/jogadores';

  constructor(private http: HttpClient) { }

  salvar(jogador: CriarJogadorDTO): Observable<void> {
    return this.http.post<void>(this.baseUrl, jogador);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      timeout(8000),
      catchError(error => {
        console.error('Erro ao deletar jogador:', error);
        return throwError(() => new Error(
          error.status === 404
            ? 'Jogador não encontrado'
            : 'Erro ao deletar o time'
        ));
      })
    );
  }

  obterPorId(id: number): Observable<JogadorDTO> {
    return this.http.get<JogadorDTO>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Erro ao buscar jogador:', error);
        return throwError(() => new Error(
          error.status === 404
            ? 'Jogador não encontrado'
            : 'Erro ao buscar o jogador'
        ));
      })
    );
  }

  atualizar(id: number, dados: AtualizarJogadorDTO): Observable<JogadorDTO> {
    return this.http.put<JogadorDTO>(`${this.baseUrl}/${id}`, dados).pipe(
      catchError(error => {
        console.error('Erro ao atualizar jogador:', error);
        return throwError(() => new Error(
          error.error?.message ||
          error.message ||
          'Erro ao atualizar jogador'
        ));
      })
    );
  }

  buscarTodos(): Observable<JogadorDTO[]> {
    return this.http.get<JogadorDTO[]>(`${this.baseUrl}`);
  }
}
