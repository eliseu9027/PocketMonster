import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BuscaPokemonComponent } from './components/busca-pokemon/busca-pokemon.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { ListaComponent } from './components/lista/lista.component';
import { ListaTipoComponent } from './components/lista-tipo/lista-tipo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TesteComponent } from './components/teste/teste/teste.component';


@NgModule({
  declarations: [
    AppComponent,
    BuscaPokemonComponent,
    CabecalhoComponent,
    RodapeComponent,
    ListaComponent,
    ListaTipoComponent,
    TesteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
