import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './pages/items/items.component';
import { MovesComponent } from './pages/moves/moves.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';


const routes: Routes = [
  { path: 'pokemon', component: PokemonComponent },
  { path: 'item', component: ItemsComponent},
  { path: 'moves', component: MovesComponent},
  { path: '**', component: PokemonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
