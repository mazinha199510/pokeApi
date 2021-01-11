import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//material
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    ScrollingModule
  ],
  exports: [ 
    MatTableModule,
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatSortModule, 
    MatInputModule, 
    MatSelectModule,
    ScrollingModule
  ]
})
export class MaterialModule { }
