import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TimeCadastroComponent} from './time-cadastro/time-cadastro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'gerenciar-times-frontend';
}
