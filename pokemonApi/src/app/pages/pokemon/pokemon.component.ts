import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IBaseHabilitys, IBaseTypes } from 'src/app/interfaces/pokemon';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import { NgxSpinnerService } from "ngx-spinner";

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})
export class PokemonComponent implements OnInit {

  totalPokemons: any = [];
  types: IBaseTypes[] = [];
  habilitys: IBaseHabilitys[] = [];
  cargando:boolean;
  name: string;
  habilitySelected: string;
  pokemon;
  typeP: any = [];
  movesP: any = [];
  evolutions: any = [];
  evolution:any = [];
  evolves: any = [];

  displayedColumns: string[] = ['id', 'name', 'image', 'type', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pokemonApiService: PokemonApiService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getPokemons(); 
    this.getSelects();
    this.getEvolutions();
  }

  getEvolutions(){
    this.pokemonApiService.getEvolution().subscribe(res => {
      this.evolutions = res;
    })
  }

  getSelects(){
    this.pokemonApiService.getTypes().subscribe((resp:IBaseTypes) => {
      this.types = resp.results;
    });

    this.pokemonApiService.getHability().subscribe((resp:IBaseHabilitys) => {
      this.habilitys = resp.results;
    });
  }

  validateTypes(e){
    const pokemon = [];
    if(e.value.length == 2){
      e.source.options._results.forEach((item) => {
        item._disabled = (item.value != e.value[0] && item.value != e.value[1])? true : false;
      });
    } else{
      e.source.options._results.forEach((item) => {
        item._disabled = (item._disabled)? false : false;
      });
    }

    for(let i = 0; i < e.value.length; i++){
      this.pokemonApiService.getPokemonType(e.value[i]).subscribe(res => {
        res.forEach((item,i) => {
          const p = this.totalPokemons.find(x => x.name === item.pokemon.name);
          if(p !== undefined){ pokemon.push(p); }
        }); 
        this.asignDataSource(pokemon);       
      });      
    }

    if(e.value.length == 0)
        this.asignDataSource(this.totalPokemons);
  }

  getPokemons(){    
    this.pokemonApiService.getPokemons().subscribe(resp => {      
      setTimeout(() => {
        this.totalPokemons = resp.results;
        this.asignDataSource(resp.results); 
        this.spinner.hide();
      }, 6500);           
    });
  }

  filter(option){
    switch(option){
      case 1:
        if(this.name !== ""){
          const item = this.totalPokemons.find(x => x.name == this.name);
          if(item !== undefined ){
              this.asignDataSource([item]);
          } else{
            this.asignDataSource([]);
          }
        } else{
          this.asignDataSource(this.totalPokemons);
        }
      break;

      case 2:
        const pokemon = [];
        for(let i = 0; i < this.habilitySelected.length; i++){
          this.pokemonApiService.getPokemonHability(this.habilitySelected[i]).subscribe(res => {
            res.forEach((item,i) => {
              const p = this.totalPokemons.find(x => x.name === item.pokemon.name);
              if(p !== undefined){ pokemon.push(p); }
            }); 
            this.asignDataSource(pokemon);       
          });      
        }
    
        if(this.habilitySelected.length == 0)
            this.asignDataSource(this.totalPokemons);
      break;
    }
  }

  asignDataSource(value){
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPokemon(id){
    this.evolves = [];
    this.pokemonApiService.getPokemonId(id).subscribe((resp:any) => {
      this.pokemon = resp;
      this.typeP = (resp.types !== undefined)? resp.types : [];
      this.movesP = (resp.moves !== undefined)? resp.moves : [];

      this.evolution = this.evolutions.find(x => x.chain.species.name == resp.name);

      const evolve = this.evolution.chain.evolves_to[0];
      this.evolves.push(this.totalPokemons.find(x => x.name == evolve.species.name));
      if(evolve.evolves_to.length > 0){
        this.evolves.push(this.totalPokemons.find(x => x.name == evolve.evolves_to[0].species.name));
      }
    });
  }
}
