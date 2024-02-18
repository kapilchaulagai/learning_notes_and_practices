import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _api = 'https://pokeapi.co/api/v2/';

  constructor(private _http: HttpClient) {}

  getAllPokemon() {
    return this._http.get(`${this._api}pokemon?limit=150`);
  }
}
