import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBaseHabilitys, IBaseTypes } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private url: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(){
    return this.http.get(`${this.url}/pokemon?limit=1118`).pipe(map((resp:any) => {
      resp.results.forEach((item, i) => {
        this.getPokemonName(item.name).subscribe(info => {
          item.id = info[0].id;
          item.img = info[0].sprites;
          item.types = '';
          if(info[0].types !== null){
            const c = info[0].types.length;
            for(let i = 0; i < c; i++){
              item.types += info[0].types[i].type.name;
              item.types += (c-i > 1)? ',' : '';
            }
          }
        });
      });
      return resp;
    }));
  }

  getTypes(){
    return this.http.get<IBaseTypes>(`${this.url}/type`);
  }

  getHability(){
    return this.http.get<IBaseHabilitys>(`${this.url}/ability?limit=327`);
  }

  getPokemonName(name: string){    
    return this.http.get(`${this.url}/pokemon/${name}`).pipe(map(resp => {
      const move = [];
      move.push(resp);
      return move;
    }));  
  }

  getPokemonType(type: string){
    return this.http.get(`${this.url}/type/${type}`).pipe(map((resp:any) => {
      return resp.pokemon;
    }));
  }

  getPokemonHability(hability: string){
    return this.http.get(`${this.url}/ability/${hability}`).pipe(map((resp:any) => {
      return resp.pokemon;
    }));
  }

  getPokemonId(id: number){
    return this.http.get(`${this.url}/pokemon/${id}`);
  }

  getEvolution(){    
    const evolution = [];
    return this.http.get(`${this.url}/evolution-chain?limit=467`).pipe(map((res:any) => {      
      res.results.forEach((item, i) => {
          this.getEvolutionName(item.url).subscribe(resp => {
            evolution.push(resp);
          });        
      });
      return evolution;
    }));
  }

  getEvolutionName(url: string){
    return this.http.get(url);
  }
}
