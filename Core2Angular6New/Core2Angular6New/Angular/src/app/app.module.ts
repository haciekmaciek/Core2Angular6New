import { NgModule, enableProdMode } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BsModalModule } from 'ng2-bs3-modal';
import { routing } from './app.routing';
import { UserComponent } from './Components/user.component';
import { HomeComponent } from './Components/home.component';
import { UserService } from './Service/user.service'
import { DialogModule } from '@progress/kendo-angular-dialog';
import { HttpClientModule } from '@angular/common/http';
import { NotfoundComponent } from './Shared/notfound.component';



//import { GridModule } from '@progress/kendo-angular-grid';
//import { ButtonsModule } from '@progress/kendo-angular-buttons';
//import { DropDownsModule } from '@progress/kendo-angular-dropdowns';



//import { Grid2Module } from './Components/grid.module';
//import { Grid2RoutingModule } from './components/grid.routing.module';
//import { Grid2Component } from './Components/grid.component';
//import { GridModule } from '@progress/kendo-angular-grid';
//import { ButtonsModule } from '@progress/kendo-angular-buttons';
////import { Shared2Module } from '../Shared/shared.module';
//import { GridEditFormComponent } from './Components/edit-form.component';
//import { DropDownsModule } from '@progress/kendo-angular-dropdowns'; 
//import { GridAllItemsComponent } from './Components/grid.all.items.component';
//import { ResizeSensorModule } from '@progress/kendo-angular-resize-sensor';

//enableProdMode();
@NgModule({
  imports: [ReactiveFormsModule, routing, BsModalModule, FormsModule, BrowserAnimationsModule, DialogModule, HttpClientModule],// GridModule, ButtonsModule, DropDownsModule],//, GridModule, ButtonsModule, DropDownsModule],
  declarations: [AppComponent, HomeComponent, UserComponent, NotfoundComponent],//, Grid2Component, GridEditFormComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService],
  bootstrap: [AppComponent]
})


//@NgModule({
//    imports: [ReactiveFormsModule, routing, Ng2Bs3ModalModule, FormsModule, BrowserAnimationsModule, DialogModule, HttpClientModule, GridModule,
//      ButtonsModule, DropDownsModule, ResizeSensorModule],//, GridModule, ButtonsModule, DropDownsModule],
//    declarations: [AppComponent, HomeComponent, UserComponent, NotfoundComponent, Grid2Component, GridEditFormComponent, GridAllItemsComponent],//, Grid2Component, GridEditFormComponent],
//    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService],
//    bootstrap: [AppComponent]

//})
export class AppModule { }
