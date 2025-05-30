import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CriarTimeDTO} from "../dtos/criar-time.dto";
import {TimeDTO} from "../dtos/time.dto";

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private baseUrl = 'http://localhost:8080/times';

  constructor(private http: HttpClient) {}

  salvar(time: CriarTimeDTO): Observable<void> {
    return this.http.post<void>(this.baseUrl, time);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
        catchError(error => {
          console.error('Erro ao deletar time:', error);
          return throwError(() => new Error(
              error.status === 404
                  ? 'Time não encontrado'
                  : 'Erro ao deletar o time'
          ));
        })
    );
  }

  obterPorId(id: number): Observable<TimeDTO> {
    return this.http.get<TimeDTO>(`${this.baseUrl}/${id}`).pipe(
        catchError(error => {
          console.error('Erro ao buscar time:', error);
          return throwError(() => new Error(
              error.status === 404
                  ? 'Time não encontrado'
                  : 'Erro ao buscar o time'
          ));
        })
    );
  }
}
