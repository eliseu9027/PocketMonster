import { BuscaService } from 'src/app/services/busca.service';
import { Lista } from './../../models/lista';
import { ListaService } from './../../services/lista.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComponent } from './lista.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { Tipo } from 'src/app/models/tipo';

const jsonResults = {
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
  ],
};

const jsonStats = {
  stats: [
    {
      base_stat: '48',
      effort: '1',
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: '48',
      effort: '0',
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: '48',
      effort: '0',
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/',
      },
    },
    {
      base_stat: '48',
      effort: '0',
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/',
      },
    },
    {
      base_stat: '48',
      effort: '0',
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/',
      },
    },
    {
      base_stat: '48',
      effort: '0',
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/',
      },
    },
  ],
};

const jsonTypes = {
  types: [
    {
      slot: '1',
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/1/',
      },
    },
  ],
};

const jsonImgs = {
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'imgTest',
        front_shiny: 'imgShinyTest',
      },
    },
  },
};

const mockService = {
  getPokemonLista(): Observable<Lista> {
    let lista = new Lista();
    lista.results = jsonResults.results;
    return of(lista);
  },
};

const service = {
  getPokemonNome(nomePokemon): Observable<Pokemon> {
    let poke = new Pokemon();

    poke.id = 1;
    poke.name = 'bulbasaur';
    poke.height = '50';
    poke.weight = '15';
    poke.stats = jsonStats.stats;
    poke.types = jsonTypes.types;
    poke.sprites = jsonImgs.sprites;
    return of(poke);
  },

  getPokemonTipo(tipoPokemon) {
    let tipo = new Tipo();
    tipo.id = 1;
    tipo.name = 'normal';
    return of(tipo);
  },
};

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaComponent],
      providers: [
        { provide: ListaService, useValue: mockService },
        { provide: BuscaService, useValue: service },
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${ListaService.prototype.getPokemonLista.name}
  should not return null value when called`, (done) => {
    component.listaPokemon();
    expect(component.listas).not.toBeNull();
    done();
  });

  it(`#${ListaService.prototype.getPokemonLista.name}
  should not return undefined value when called`, (done) => {
    component.listaPokemon();
    expect(component.listas).not.toBeUndefined();
    done();
  });

  it(`#${ListaService.prototype.getPokemonLista.name}
  should return lista data when called`, (done) => {
    component.listaPokemon();
    expect(component.listas[0].name).toBe('bulbasaur');
    expect(component.listas[0].id).toBe(1);
    expect(component.listas[0].type).toBe('grass');
    expect(component.listas[0].type2).toBe('--');
    done();
  });

  it(`#${ListaComponent.prototype.habilitaAvanco.name}
  should enable forward button when index is less than list size`, (done) => {
    component.listas.length = 3;
    component.indexAtual = 2;
    expect(component.habilitaAvanco()).toBe(false);
    done();
  });

  it(`#${ListaComponent.prototype.habilitaAvanco.name}
  should disable advance button when index is greater than list size`, (done) => {
    component.listas.length = 1;
    component.indexAtual = 2;
    expect(component.habilitaAvanco()).toBe(true);
    done();
  });

  it(`#${ListaComponent.prototype.habilitaRetrocesso.name}
  should enable backspace button when (index - page size) is greater than zero`, (done) => {
    component.pageSize = 1;
    component.indexAtual = 2;
    expect(component.habilitaRetrocesso()).toBe(false);
    done();
  });

  it(`#${ListaComponent.prototype.habilitaRetrocesso.name}
  should disable backspace button when (index - page size) is less than zero`, (done) => {
    component.pageSize = 2;
    component.indexAtual = 2;
    expect(component.habilitaRetrocesso()).toBe(true);
    done();
  });

  it(`#${ListaComponent.prototype.primeira.name} should set the value of indexAtual to zero when called`, (done) => {
    component.indexAtual = 10;
    component.primeira();
    expect(component.indexAtual).toBe(0);
    done();
  });

  it(`#${ListaComponent.prototype.ultima.name} should set value of indexatual to size of (lista - pagasize) when called`, (done) => {
    component.pageSize = 10;
    component.listas.length = 50;
    component.ultima();
    console.log(component.indexAtual);
    expect(component.indexAtual).toBe(50);
    done();
  });

  it(`#${ListaComponent.prototype.ultima.name} should adapt the current indexatual when the remaining list values ​​are smaller than pagesize`, (done) => {
    component.pageSize = 3;
    component.listas.length = 50;
    component.ultima();
    expect(component.indexAtual).toBe(50);
    done();
  });

  it(`#${ListaComponent.prototype.anteriorPagina.name} should adpat the value of the indexatual to the previous page when called`, (done) => {
    component.pageSize = 10;
    component.indexAtual = 15;
    component.listas.length = 10;
    component.anteriorPagina();
    expect(component.indexAtual).toBe(10);
    done();
  });

  it(`#${ListaComponent.prototype.anteriorPagina.name} should set the value of the indexatual to the previous page when called`, (done) => {
    component.pageSize = 20;
    component.indexAtual = 20;
    component.listas.length = 30;
    component.anteriorPagina();
    expect(component.indexAtual).toBe(0);
    done();
  });
});
