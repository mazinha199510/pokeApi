import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ItemApiService } from 'src/app/services/item-api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  totalItems = [];
  item;
  attributes: string;

  
  displayedColumns: string[] = ['id', 'name', 'image', 'category', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private itemsService: ItemApiService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getItems();
  }

  getItems(){
    this.itemsService.getItems().subscribe(resp => {  
      setTimeout(() => {    
        this.totalItems = resp.results;      
        this.asignDataSource(resp.results);
        this.spinner.hide();
      },5000);     
    });
  }

  filter(e){
    if(e.target.value !== ""){
      const item = this.totalItems.find(x => x.name == e.target.value);
      if(item !== undefined ){
          this.asignDataSource([item]);
      } else{
        this.asignDataSource([]);
      }
    } else{
      this.asignDataSource(this.totalItems);
    } 
  }

  getItem(id){
    this.itemsService.getItemId(id).subscribe((resp:any) => {
      this.item = resp;
    });
  }

  asignDataSource(value){
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
