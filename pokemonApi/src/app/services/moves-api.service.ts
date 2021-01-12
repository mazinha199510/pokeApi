import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovesApiService {

  private url: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getMoves(){
    return this.http.get(`${this.url}/move?limit=813`).pipe(map((resp:any) => {
      resp.results.forEach((item, i) => {
        this.getMoveName(item.name).subscribe((move:any) => {
          item.id = move[0].id;
          item.type = (move[0].type !== null)? move[0].type.name : '-';
          item.category = (move[0].damage_class !== null)? move[0].damage_class.name : '-';
        });        
      });      
      return resp;
    }));
  }

  getDamage(){
    return this.http.get(`${this.url}/move-damage-class`);
  }

  getMoveType(type: string, totalMoves:any){
    return this.http.get(`${this.url}/type/${type}`).pipe(map((resp:any) => {
      resp.moves.forEach(element => {
        const move = totalMoves.find(x => x.name == element.name);
        element.id = move.id;
        element.type = move.type;
        element.category = move.category;
      });
      return resp;
    }));
  }

  getMoveCategory(category: string, totalMoves:any){
    return this.http.get(`${this.url}/move-damage-class/${category}`).pipe(map((resp:any) => {
      resp.moves.forEach(element => {
        element.id = totalMoves.find(x => x.name == element.name).id;
      });
      return resp;
    }));
  }

  getMoveName(name: string){    
    return this.http.get(`${this.url}/move/${name}`).pipe(map(resp => {
      const move = [];
      move.push(resp);
      return move;
    }));  
  }

  getMoveId(id: number){
    return this.http.get(`${this.url}/move/${id}`);
  }
}
