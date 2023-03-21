import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipoComponent } from './lista-tipo.component';
import { Pokemon } from 'src/app/models/pokemon';
import { Observable, of } from 'rxjs';
import { Tipo } from 'src/app/models/tipo';
import { BuscaService } from 'src/app/services/busca.service';

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
        name: 'eletric',
        url: 'https://pokeapi.co/api/v2/type/1/',
      },
    },
  ],
};

const json = {
  name: 'eletric',
  pokemon: [
    {
      pokemon: {
        name: 'charizard',
        url: 'https://pokeapi.co/api/v2/pokemon/6/',
      },
      slot: 2,
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
  getPokemonNome(nomePokemon): Observable<Pokemon> {
    let poke = new Pokemon();

    poke.id = 25;
    poke.name = 'pikachu';
    poke.height = '50';
    poke.weight = '15';
    poke.stats = jsonStats.stats;
    poke.types = jsonTypes.types;
    poke.sprites = jsonImgs.sprites;
    return of(poke);
  },

  getPokemonTipo(tipoPokemon) {
    let tipo = new Tipo();
    tipo.pokemon = json.pokemon;
    return of(tipo);
  },
};

describe('ListaTipoComponent', () => {
  let component: ListaTipoComponent;
  let fixture: ComponentFixture<ListaTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaTipoComponent],
      providers: [{ provide: BuscaService, useValue: mockService }],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${ListaTipoComponent.prototype.buscaTipo.name}
  should not return null value when called`, (done) => {
    component.buscaTipo();
    expect(component.pokemons).not.toBeNull();
    done();
  });

  it(`#${ListaTipoComponent.prototype.buscaTipo.name}
  should not return undefined value when called`, (done) => {
    component.buscaTipo();
    expect(component.pokemons).not.toBeUndefined();
    done();
  });

  it(`#${ListaTipoComponent.prototype.buscaTipo.name}
  should return defined value when called`, (done) => {
    component.buscaTipo();
    expect(component.pokemons).toBeDefined();
    done();
  });

  it(`#${ListaTipoComponent.prototype.buscaTipo.name} should return pokemon data when called`, (done) => {
    component.tipo = 1;
    component.buscaTipo();
    expect(component.pokemons[0].id).toBe(25);
    expect(component.pokemons[0].name).toBe('charizard');
    expect(component.pokemons[0].typeId).toBe(1);
    expect(component.pokemons[0].type).toBe('eletric');
    expect(component.pokemons[0].img).toBe('imgTest');
    done();
  });

  it(`#${ListaTipoComponent.prototype.habilitaAvanco.name}
  should enable forward button when index is less than list size`, (done) => {
    component.pokemons.length = 3;
    component.indexAtual = 2;
    expect(component.habilitaAvanco()).toBe(false);
    done();
  });

  it(`#${ListaTipoComponent.prototype.habilitaAvanco.name}
  should disable advance button when index is greater than list size`, (done) => {
    component.pokemons.length = 1;
    component.indexAtual = 2;
    expect(component.habilitaAvanco()).toBe(true);
    done();
  });

  it(`#${ListaTipoComponent.prototype.habilitaRetrocesso.name}
  should enable backspace button when (index - page size) is greater than zero`, (done) => {
    component.pageSize = 1;
    component.indexAtual = 2;
    expect(component.habilitaRetrocesso()).toBe(false);
    done();
  });

  it(`#${ListaTipoComponent.prototype.habilitaRetrocesso.name}
  should disable backspace button when (index - page size) is less than zero`, (done) => {
    component.pageSize = 2;
    component.indexAtual = 2;
    expect(component.habilitaRetrocesso()).toBe(true);
    done();
  });

  it(`#${ListaTipoComponent.prototype.primeira.name} should set the value of indexAtual to zero when called`, (done) => {
    component.indexAtual = 1;
    component.primeira();
    expect(component.indexAtual).toBe(0);
    done();
  });

  it(`#${ListaTipoComponent.prototype.ultima.name} should set value of indexatual to size of (lista - pagasize) when called`, (done) => {
    component.pageSize = 10;
    component.pokemons.length = 50;
    component.ultima();
    console.log(component.indexAtual);
    expect(component.indexAtual).toBe(50);
    done();
  });

  it(`#${ListaTipoComponent.prototype.ultima.name} should adapt the current indexatual when the remaining list values ​​are smaller than pagesize`, (done) => {
    component.pageSize = 3;
    component.pokemons.length = 50;
    component.ultima();
    expect(component.indexAtual).toBe(50);
    done();
  });

  it(`#${ListaTipoComponent.prototype.anteriorPagina.name} should adpat the value of the indexatual to the previous page when called`, (done) => {
    component.pageSize = 10;
    component.indexAtual = 15;
    component.pokemons.length = 10;
    component.anteriorPagina();
    expect(component.indexAtual).toBe(10);
    done();
  });

  it(`#${ListaTipoComponent.prototype.anteriorPagina.name} should set the value of the indexatual to the previous page when called`, (done) => {
    component.pageSize = 20;
    component.indexAtual = 20;
    component.pokemons.length = 30;
    component.anteriorPagina();
    expect(component.indexAtual).toBe(0);
    done();
  });
});
