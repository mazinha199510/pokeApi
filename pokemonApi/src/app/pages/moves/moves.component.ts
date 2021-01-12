import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IBaseTypes } from 'src/app/interfaces/pokemon';
import { MovesApiService } from 'src/app/services/moves-api.service';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit {

  totalMoves = [];
  types = [];
  category = [];
  typeSelected: string = '';
  categorySelected: string = '';
  name: string = '';
  move;
  
  displayedColumns: string[] = ['id', 'name', 'type', 'category', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private moveService: MovesApiService,
              private pokemonService: PokemonApiService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMoves();
    this.getSelects();
  }

  getMoves(){
    this.spinner.show();
    this.moveService.getMoves().subscribe(resp => {
      setTimeout(() =>{
        this.totalMoves = resp.results;
        this.asignDatasource(resp.results);
        this.spinner.hide();
      }, 5000);      
    });
  }

  getMove(id){
    this.moveService.getMoveId(id).subscribe((resp:any) => {
      this.move = resp;
    })
  }

  getSelects(){
    this.pokemonService.getTypes().subscribe((resp:IBaseTypes) => {
      this.types = resp.results;
    });

    this.moveService.getDamage().subscribe((resp:any) => {
      this.category = resp.results;
    });
  }

  filter(option){
    switch(option){
      case 1:
        if(this.name !== ""){
          const move = this.totalMoves.find(x => x.name == this.name);
          if(move !== undefined ){
            this.asignDatasource([move]);
          } else{
            this.asignDatasource([]);
          }
        } else{
          this.asignDatasource(this.totalMoves);
        }                
        this.categorySelected = undefined;
        this.typeSelected = undefined;
      break;

      case 2:
        this.moveService.getMoveType(this.typeSelected,this.totalMoves).subscribe((resp:any) => {
          this.asignDatasource(resp.moves); 
        });
        this.name = '';
        this.categorySelected = undefined;
      break;

      case 3:
        this.moveService.getMoveCategory(this.categorySelected,this.totalMoves).subscribe((resp:any) => {
          this.asignDatasource(resp.moves);
        });
        this.name = '';
        this.typeSelected = undefined;
      break;
    }
  }

  asignDatasource(value){
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
