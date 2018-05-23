import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { map } from 'rxjs/operators/map';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

const itemIndex = (item: any, data: any[]): number => {
  for (let idx=0; idx < data.length; idx++) {
    if (data[idx].ProductID === item.ProductID) {
      return idx;
    }
  }
}

const cloneData = (data: any[]) => data.map(item => Object.assign({}, item));

@Injectable({
  providedIn: 'root'
})
export class EditService extends BehaviorSubject<any[]>{
  private data: any[] = [];
  private originalData: any[] = [];
  private createItems: any[] = [];
  private updateItems: any[] = [];
  private deleteItems: any[] = [];

  constructor(private http: HttpClient) {
    super([]);
  }

  private reset() {
    this.data = [];
    this.deleteItems = [];
    this.updateItems = [];
    this.createItems = [];
  }

  private isNew(item: any): boolean {
    return !item.ProductID;
  }

  private serializeModels(data?: any): string {
    return data ? `&models=${JSON.stringify(data)}` : '';
  }

  private fetch(action: string = '', data?: any): Observable<any[]> {
    return this.http
      .jsonp(`https://demos.telerik.com/kendo-ui/service/Products/${action}?
      ${this.serializeModels(data)}`, 'callback')
      .pipe(map(res => <any[]>res));
  }

  public read() {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.fetch()
      .subscribe(data => {
        this.data = data;
        this.originalData = cloneData(data);
        super.next(data);
      })
  }

  public create(item: any): void {
    this.createItems.push(item);
    this.data.unshift(item);

    super.next(this.data);
  }

  public update(item: any): void {
    if (!this.isNew(item)) {
      const index = itemIndex(item, this.updateItems);
      if (index !== -1) {
        this.updateItems.splice(index, 1, item);
      } else {
        this.updateItems.push(item);
      }
    } else {
      const index = this.createItems.indexOf(item);
      this.createItems.splice(index, 1, item);
    }
  }

  public remove(item: any): void {
    let index = itemIndex(item, this.data);
    this.data.splice(index, 1);

    index = itemIndex(item, this.createItems);
    if (index >= 0) {
      this.createItems.splice(index, 1);
    } else {
      this.deleteItems.push(item);
    }

    index = itemIndex(item, this.updateItems);
    if (index >= 0) {
      this.updateItems.splice(index, 1);
    }

    super.next(this.data);
  }

  public hasChanges(): boolean {
    return Boolean(this.deleteItems.length || this.updateItems.length ||
    this.createItems.length);
  }

  public saveChanges(): void {
    if (!this.hasChanges()) {
      return;
    }

    const completed = [];
    if (this.deleteItems.length) {
      completed.push(this.fetch(REMOVE_ACTION, this.deleteItems));
    }
    if (this.updateItems.length) {
      completed.push(this.fetch(UPDATE_ACTION, this.updateItems));
    }
    if (this.createItems.length) {
      completed.push(this.fetch(CREATE_ACTION, this.createItems));
    }

    this.reset();

    zip(...completed).subscribe(() => this.read());
  }

  public cancelChanges(): void {
    this.reset();

    this.data = this.originalData;
    this.originalData = cloneData(this.originalData);
    super.next(this.data);
  }

  public assignValues(target: any, source: any): void {
    Object.assign(target, source);
  }
}
