import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridComponent } from './grid/grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { AppRoutingModule } from './/app-routing.module';
import { CategoriesSevice } from './northwind.service';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonsModule,
    GridModule,
    AppRoutingModule
  ],
  providers: [CategoriesSevice],
  bootstrap: [AppComponent]
})
export class AppModule { }
