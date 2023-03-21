import { BuscaService } from './../../services/busca.service';
import { Lista } from './../../models/lista';
import { ListaService } from './../../services/lista.service';
import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/tipo';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  listas: Lista[];
  indexAtual: number = 0;
  pageSize: number = 30;
  paginaAtual: Lista[];
  icone: string[];
  icone2: string[];
  estilo: string[];
  estilo2: string[];
  tipo: Tipo[];
  tipo2: Tipo[];

  constructor(
    private serviceLista: ListaService,
    private buscaService: BuscaService
  ) {}

  ngOnInit(): void {
    this.listaPokemon();
    this.icone = [];
    this.estilo = [];
    this.tipo = [];
    this.icone2 = [];
    this.estilo2 = [];
    this.tipo2 = [];
    this.listas = [];
  }

  listaPokemon() {
    this.serviceLista.getPokemonLista().subscribe((results: any) => {
      this.listas = results.results;
      for (let i = 0; i < this.listas.length; i++) {
        this.buscaService
          .getPokemonNome(this.listas[i].name)
          .subscribe((busca) => {
            this.listas[i].id = busca.id;
            this.listas[i].img = busca.sprites['other']['official-artwork']['front_default'];

            if (busca.types.length == 2) {
              this.listas[i].type = busca.types[0]['type']['name'];
              this.listas[i].type2 = busca.types[1]['type']['name'];
            } else {
              this.listas[i].type = busca.types[0]['type']['name'];
              this.listas[i].type2 = '--';
            }

            this.listas[i].icone = `assets/icons/${this.listas[i].type}.svg`;
            this.listas[i].estilo = this.listas[i].type;

            this.listas[i].icone2 = `assets/icons/${this.listas[i].type2}.svg`;
            this.listas[i].estilo2 = this.listas[i].type2;

            this.listas[i].back = `assets/img/tipo/${this.listas[i].type}.png`
          });
      }
      this.proximaPagina();
    });
  }

  habilitaAvanco(): Boolean {
    if (this.indexAtual < this.listas.length) {
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
    if (this.indexAtual + this.pageSize > this.listas.length) {
      let aux = this.listas.length - this.indexAtual;
      for (let i = 0; i < aux; i++) {
        this.paginaAtual.push(this.listas[this.indexAtual]);
        this.indexAtual++;
      }
    } else {
      for (let i = 0; i < this.pageSize; i++) {
        this.paginaAtual.push(this.listas[this.indexAtual]);
        this.indexAtual++;
      }
    }
    this.habilitaAvanco();
    this.habilitaRetrocesso();

  }

  anteriorPagina() {
    this.paginaAtual = [];
    if (this.indexAtual >= this.listas.length) {
      let aux = this.indexAtual % this.pageSize;
      this.indexAtual -= this.pageSize + aux;
      for (let i = 0; i < this.pageSize; i++) {
        this.paginaAtual.push(this.listas[this.indexAtual]);
        this.indexAtual++;
      }
    } else {
      this.indexAtual -= this.pageSize * 2;
      for (let i = 0; i < this.pageSize; i++) {
        this.paginaAtual.push(this.listas[this.indexAtual]);
        this.indexAtual++;
      }
    }

    this.habilitaRetrocesso();
    this.habilitaAvanco();
  }

  primeira() {
    this.indexAtual = 0;
    this.proximaPagina();
  }

  ultima() {
    let aux = this.listas.length % this.pageSize;
    if (aux == 0) {
      this.indexAtual = (this.listas.length - this.pageSize);
    } else {
      this.indexAtual = (this.listas.length - aux);
    }
    this.proximaPagina();
  }
}
