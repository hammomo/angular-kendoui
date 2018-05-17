import { Component, OnInit } from '@angular/core';
import { products } from './products';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public gridData: any[] = products;

  constructor() { }

  ngOnInit() {
  }

}
