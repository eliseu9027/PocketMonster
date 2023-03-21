import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BuscaPokemonComponent } from './busca-pokemon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { BuscaService } from 'src/app/services/busca.service';
import { Pokemon } from 'src/app/models/pokemon';
import { Observable } from 'rxjs';
import { Tipo } from 'src/app/models/tipo';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';

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
    tipo.id = 1;
    return of(tipo);
  },
};

describe(BuscaPokemonComponent.name, () => {
  let component: BuscaPokemonComponent;
  let fixture: ComponentFixture<BuscaPokemonComponent>;
  let router: Router;
  let route: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscaPokemonComponent],
      providers: [
        { provide: BuscaService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: convertToParamMap({
                id: '1',
              }),
            },
          },
        },
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
    spyOn(route, 'get').and.returnValue(params: { id: '1'})
    fixture = TestBed.createComponent(BuscaPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it(`#${BuscaService.prototype.getPokemonNome.name} should return pokemon data when called`, (done) => {
    component.nomePokemon = 'pikachu';
    component.buscaPokemon();
    expect(component.pokemon.id).toBe(25);
    expect(component.pokemon.name).toBe('pikachu');
    expect(component.pokemon.height).toBe('50');
    expect(component.pokemon.weight).toBe('15');
    expect(component.pokemon.hp).toBe('48');
    expect(component.pokemon.attack).toBe('48');
    expect(component.pokemon.defense).toBe('48');
    expect(component.pokemon.specialAttack).toBe('48');
    expect(component.pokemon.specialDefense).toBe('48');
    expect(component.pokemon.speed).toBe('48');
    expect(component.pokemon.img).toBe('imgTest');
    expect(component.pokemon.imgShiny).toBe('imgShinyTest');
    expect(component.pokemon.type).toBe('eletric');
    expect(component.pokemon.type2).toBe('--');
    done();
  });

  it(`#${BuscaPokemonComponent.prototype.buscaPokemon.name} should set the value type2 equal to '--' when type is empty`, (done) => {
    component.nomePokemon = 'pikachu';
    component.buscaPokemon();
    expect(component.pokemon.type2).toBe('--');
    done();
  });

  it(`#${BuscaPokemonComponent.prototype.buscaPokemon.name} should not return null value when called`, (done) => {
    component.nomePokemon = 'pikachu';
    component.buscaPokemon();
    expect(component.pokemon).not.toBeNull();
    done();
  });

  it(`#${BuscaPokemonComponent.prototype.getIcon.name} should set the value type2 equal to undefined when type is '--'`, (done) => {
    component.getIcon();
    expect(component.pokemon.type2).toBeUndefined();
    done();
  });

  it(`#${BuscaPokemonComponent.prototype.getIcon.name} should set the value of card style attributes when called`, (done) => {
    component.pokemon.type = 'eletric';
    component.pokemon.type2 = 'normal';
    component.getIcon();
    expect(component.icone).toBe('assets/icons/eletric.svg');
    expect(component.icone2).toBe('assets/icons/normal.svg');
    expect(component.estilo).toBe('eletric');
    expect(component.estilo2).toBe('normal');
    expect(component.tipo).toBe(1);
    expect(component.tipo2).toBe(1);
    done();
  });

  it('test', (done) => {
    fixture.detectChanges();
    expect(component.nomePokemon).toBe('1');
    done();
  });
});
