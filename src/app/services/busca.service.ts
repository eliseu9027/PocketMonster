import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

const API = 'https://pokeapi.co/api/v2/pokemon/';

@Injectable({
  providedIn: 'root',
})
export class BuscaService {
  constructor(private http: HttpClient) {}

  public getPokemonNome(nomeDoPokemon: any): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${API}${nomeDoPokemon}`);
  }

  public getPokemonTipo(tipoPokemon) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/type/${tipoPokemon}`);
  }

}
