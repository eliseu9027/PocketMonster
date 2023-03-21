import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ListaService } from './lista.service';

describe('ListaService', () => {
  let service: ListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${ListaService.prototype.getPokemonLista.name} value should not be null when returned `, () => {
    expect(service.getPokemonLista()).not.toBeNull();
  });
});
