import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectListPageRoutingModule } from './project-list-routing.module';

import { ProjectListPage } from './project-list.page';
import {FolderPageModule} from "../folder/folder.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProjectListPageRoutingModule,
        FolderPageModule
    ],
  declarations: [ProjectListPage]
})
export class ProjectListPageModule {}
