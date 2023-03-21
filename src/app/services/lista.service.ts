import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lista } from '../models/lista';

const API = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  constructor(private http: HttpClient) {}

  public getPokemonLista(): Observable<Lista> {
    return this.http.get<Lista>(`${API}`);
  }
}
