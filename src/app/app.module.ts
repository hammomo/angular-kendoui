import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
// import { CategoriesSevice } from './northwind.service';
import { EditService } from './edit.service';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ButtonsModule,
    GridModule,
    DropDownsModule,
    DialogModule,
    AppRoutingModule
  ],
  providers: [EditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
