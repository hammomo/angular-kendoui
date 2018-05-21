import { Component, OnInit } from '@angular/core';
import { products } from './products';
import { Observable } from 'rxjs';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { CategoriesSevice } from '../northwind.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  // public gridData: any[] = products;
  public view: Observable<GridDataResult>;
  public state: State = {
    skip: 0,
    take: 5
  }

  constructor(private service: CategoriesSevice) {
    this.view = service;
    this.service.query(this.state);
   }

  ngOnInit() {
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.service.query(state);
  }

}
