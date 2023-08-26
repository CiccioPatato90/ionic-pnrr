import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {ProjectListTileComponent} from "../../components/project-list-tile/project-list-tile.component";
import {GroupByPopupComponent} from "../../components/group-by-popup/group-by-popup.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FolderPageRoutingModule,
        ScrollingModule
    ],
  exports: [
    FolderPage,
    ProjectListTileComponent
  ],
    declarations: [FolderPage, ProjectListTileComponent, GroupByPopupComponent]
})
export class FolderPageModule {}
