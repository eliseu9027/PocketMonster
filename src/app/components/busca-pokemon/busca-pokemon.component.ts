
import { BuscaService } from './../../services/busca.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-busca-pokemon',
  templateUrl: './busca-pokemon.component.html',
  styleUrls: ['./busca-pokemon.component.scss'],
})
export class BuscaPokemonComponent implements OnInit {
  nomePokemon: string;
  formulario: FormGroup;
  pokemon: Pokemon;
  imagem: string;
  icone: string;
  icone2: string;
  estilo: string;
  estilo2: string;
  tipo: number;
  back: string;
  tipo2: number;

  constructor(
    private service: BuscaService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pBCongif: NgbProgressbarConfig
  ) {
    pBCongif.max = 185;
    pBCongif.height = '30px';
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nomePokemon: [this.nomePokemon, [Validators.required]],
    });

    if (this.activatedRoute.snapshot.paramMap.get('id') != undefined) {
      this.nomePokemon = this.activatedRoute.snapshot.paramMap.get('id');
      this.buscaPokemon();
    }
    this.pokemon = new Pokemon();
   }

  buscaPokemon() {
      this.service.getPokemonNome(this.nomePokemon.toLocaleLowerCase()).subscribe(
      (busca) => {
        this.pokemon.name = busca.name;
        this.pokemon.id = busca.id;
        this.pokemon.weight = busca.weight;
        this.pokemon.height = busca.height;
        this.pokemon.hp = busca.stats[0]['base_stat'];
        this.pokemon.attack = busca.stats[1]['base_stat'];
        this.pokemon.defense = busca.stats[2]['base_stat'];
        this.pokemon.specialAttack = busca.stats[3]['base_stat'];
        this.pokemon.specialDefense = busca.stats[4]['base_stat'];
        this.pokemon.speed = busca.stats[5]['base_stat'];

        if (busca.types.length == 2) {
          this.pokemon.type = busca.types[0]['type']['name'];
          this.pokemon.type2 = busca.types[1]['type']['name'];
        } else {
          this.pokemon.type = busca.types[0]['type']['name'];
          this.pokemon.type2 = '--';
        }

        this.back = `assets/img/tipo/${this.pokemon.type}.png`

        this.pokemon.img = busca.sprites['other']['official-artwork']['front_default'];
        this.pokemon.imgShiny = busca.sprites['other']['official-artwork']['front_shiny'];

        this.getIcon();
      },

      (erro) => {
        if (erro.status === 404) {
          alert('Pokemon não Encontrado');
        }
      }
    );
  }

  getIcon() {
    this.icone = `assets/icons/${this.pokemon.type}.svg`;
    this.estilo = this.pokemon.type;
    this.service.getPokemonTipo(this.pokemon.type).subscribe((get) => {
      this.tipo = get.id;
    });

    if (this.pokemon.type2 == '--') {
      this.icone2 = undefined;
      this.estilo2 = undefined;
      this.tipo2 = undefined;
    } else {
      this.icone2 = `assets/icons/${this.pokemon.type2}.svg`;
      this.estilo2 = this.pokemon.type2;
      this.service.getPokemonTipo(this.pokemon.type2).subscribe((get) => {
        this.tipo2 = get.id;
      });
    }
  }
}
