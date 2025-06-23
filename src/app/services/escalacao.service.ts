import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AtualizarTimeDTO} from '../dtos/atualizar-time.dto';
import {catchError, Observable, throwError} from 'rxjs';
import {JogadorDTO} from '../dtos/jogador.dto';
import {EscalacaoDTO} from '../dtos/escalacao.dto';

@Injectable({
  providedIn: 'root'
})
export class EscalacaoService {

  private baseUrl = 'http://localhost:8080/jogadores/time';

  constructor(private http: HttpClient) {}

  obterJogadoresDoTime(timeId: number): Observable<JogadorDTO[]> {
    return this.http.get<JogadorDTO[]>(`${this.baseUrl}/${timeId}`).pipe(
      catchError(error => {
        console.error('Erro ao buscar jogadores:', error);
        return throwError(() => new Error(
          error.status === 404 ? 'Jogadores não encontrados' : 'Erro ao buscar'
        ));
      })
    );
  }
}
