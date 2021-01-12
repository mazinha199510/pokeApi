import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonComponent } from './pages/pokemon/pokemon.component';


const routes: Routes = [
  { path: 'pokemon', component: PokemonComponent },
  { path: '**', component: PokemonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
