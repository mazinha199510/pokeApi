import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';

//Modules
import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { ItemsComponent } from './pages/items/items.component';
import { MovesComponent } from './pages/moves/moves.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    ItemsComponent,
    MovesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
