import { Observable, map } from 'rxjs';
import { LoginService } from './../../service/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private loginService: LoginService) {}

  pokemons$: Observable<any> = this.loginService.getAllPokemon().pipe(
    map((pokemon: any) => {
      return pokemon?.results?.map((poke: any) => poke.name);
    })
  );
}
