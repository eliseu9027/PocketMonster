import { TesteComponent } from './../components/teste/teste/teste.component';
import { ListaTipoComponent } from './../components/lista-tipo/lista-tipo.component';
import { ListaComponent } from './../components/lista/lista.component';
import { BuscaPokemonComponent } from './../components/busca-pokemon/busca-pokemon.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'busca',
  },
  {
    path: 'busca',
    component: BuscaPokemonComponent,
  },
  {
    path: 'busca/:id',
    component: BuscaPokemonComponent,
  },
  { path: 'lista', component: ListaComponent },
  { path: 'listaTipo', component: ListaTipoComponent },
  { path: 'listaTipo/:tipo', component: ListaTipoComponent },
  { path: 'teste', component: TesteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
