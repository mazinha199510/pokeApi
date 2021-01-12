import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {

  private url: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(`${this.url}/item?limit=954`).pipe(map((resp: any) => {
      resp.results.forEach((item, i) => {
        if (item.name !== "miracle-seed") {
          this.getItemName(item.name).subscribe(info => {
            item.id = info[0].id;
            item.img = info[0].sprites;
            item.category = info[0].category;
          });
        } else{
          resp.results.splice(i,1);
        }
      });
      return resp;
    }));
  }

  getItemName(name: string) {
    return this.http.get(`${this.url}/item/${name}`).pipe(map(resp => {
      const move = [];
      move.push(resp);
      return move;
    }));
  }

  getItemId(id: number) {
    return this.http.get(`${this.url}/item/${id}`);
  }
}
