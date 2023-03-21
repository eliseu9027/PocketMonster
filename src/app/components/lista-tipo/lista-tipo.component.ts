import { BrowserModule } from '@angular/platform-browser';
import { Tipo } from './../../models/tipo';
import { BuscaService } from './../../services/busca.service';
import { Pokemon } from './../../models/pokemon';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-tipo',
  templateUrl: './lista-tipo.component.html',
  styleUrls: ['./lista-tipo.component.scss'],
})
export class ListaTipoComponent implements OnInit {
  tipo: number;
  pokemons: Pokemon[];
  indexAtual: number = 0;
  pageSize: number = 40;
  paginaAtual: Pokemon[];

  constructor(
    private buscaService: BuscaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pokemons = [];

    if (this.activatedRoute.snapshot.paramMap.get('tipo') != undefined) {
      this.tipo = parseInt(this.activatedRoute.snapshot.paramMap.get('tipo'));
      this.buscaTipo();
    }
  }

  buscaTipo() {
    if (this.pokemons.length > 0) {
      if (this.tipo == this.pokemons[0].typeId) {
        this.pokemons = [];
        this.paginaAtual = [];
        return;
      }
    }

    this.buscaService.getPokemonTipo(this.tipo).subscribe((busca) => {
      this.pokemons = [];
      for (let i = 0; i < busca.pokemon.length; i++) {
        let pokemon: Pokemon;
        pokemon = new Pokemon();
        pokemon.name = busca.pokemon[i]['pokemon']['name'];
        pokemon.typeId = this.tipo;
        this.buscaService.getPokemonNome(pokemon.name).subscribe((result) => {
          pokemon.id = result.id;
          pokemon.img = result.sprites['other']['official-artwork']['front_default'];
          pokemon.type = result.types[0]['type']['name'];
          pokemon.back = `assets/img/tipo/${pokemon.type}.png`
        });
        this.pokemons.push(pokemon);
      }
      this.indexAtual = 0;
      this.proximaPagina();
    });
  }

  habilitaAvanco(): Boolean {
    if (this.indexAtual < this.pokemons.length) {
      return false;
    } else {
      return true;
    }
  }

  habilitaRetrocesso(): Boolean {
    if (this.indexAtual - this.pageSize > 0) {
      return false;
    } else {
      return true;
    }
  }

  proximaPagina() {
    this.paginaAtual = [];
    if (this.indexAtual + this.pageSize > this.pokemons.length) {
      let aux = this.pokemons.length - this.indexAtual;
      for (let i = 0; i < aux; i++) {
        this.paginaAtual.push(this.pokemons[this.indexAtual]);
        this.indexAtual++;
      }
    } else {
      for (let i = 0; i < this.pageSize; i++) {
        this.paginaAtual.push(this.pokemons[this.indexAtual]);
        this.indexAtual++;
      }
    }

    this.habilitaRetrocesso();
    this.habilitaAvanco();
  }

  anteriorPagina() {
    this.paginaAtual = [];
    if (this.indexAtual >= this.pokemons.length) {
      let aux = this.indexAtual % this.pageSize;
      this.indexAtual -= this.pageSize + aux;
      for (let i = 0; i < this.pageSize; i++) {
        this.paginaAtual.push(this.pokemons[this.indexAtual]);
        this.indexAtual++;
      }
      console.log(this.indexAtual);
    } else {
      this.indexAtual -= this.pageSize * 2;
      for (let i = 0; i < this.pageSize; i++) {
        this.paginaAtual.push(this.pokemons[this.indexAtual]);
        this.indexAtual++;
      }
      console.log(this.indexAtual);
    }

    this.habilitaRetrocesso();
    this.habilitaAvanco();
  }

  primeira() {
    this.indexAtual = 0;
    this.proximaPagina();
  }

  ultima() {
    let aux = this.pokemons.length % this.pageSize;
    if (aux == 0) {
      this.indexAtual = this.pokemons.length - this.pageSize;
    } else {
      this.indexAtual = this.pokemons.length - aux;
    }

    this.proximaPagina();
  }
}
