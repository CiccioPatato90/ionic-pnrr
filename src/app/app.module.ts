import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {CsvService} from "../services/csv.service";
import {FolderPageModule} from "./folder/folder.module";
import {IonicStorageModule} from "@ionic/storage-angular";
import {DataService} from "../services/data.service";

@NgModule({
  declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FolderPageModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CsvService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
