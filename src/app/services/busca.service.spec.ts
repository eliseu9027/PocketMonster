
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BuscaService } from './busca.service';

describe('BuscaService', () => {
  let service: BuscaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BuscaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${BuscaService.prototype.getPokemonNome.name} value should not be null when returned `, () => {
    const name = service.getPokemonNome('teste');
    expect(name).not.toBeNull();
  });

  it(`#${BuscaService.prototype.getPokemonTipo.name} value should not be null when returned `, () => {
    const tipo = service.getPokemonTipo('teste');
    expect(tipo).not.toBeNull();
  });
});
