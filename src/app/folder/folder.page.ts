import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CsvService} from "../../services/csv.service";
import {Project} from "../../models/project";
import {ModalController, NavController} from "@ionic/angular";
import {GroupByPopupComponent} from "../../components/group-by-popup/group-by-popup.component";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  importedData = new Array<Project>();
  projectAttributes = new Array<string>();
  isLoading: boolean = false;
  constructor(private csvService: CsvService,
              private modalController: ModalController,
              private navController: NavController,
              private dataService: DataService) {}

  ngOnInit() {
  }

  public async fileBrowseHandler(event: any) {
    this.isLoading = true;
    let fileContent = await this.getTextFromFile(event);
    this.csvService.importDataFromCSV(fileContent);
    this.isLoading = false;
    //await this.navController.pop();
    await this.navController.navigateForward('/projects');
  }

  private async getTextFromFile(event: any) {
    console.log('updatedFile: ', event);
    const file: File = event.target.files[0];
    return await file.text();
  }

  async showGroupByPopup() {
    const modal = await this.modalController.create({
      component: GroupByPopupComponent,
      componentProps:{
        attributes: this.projectAttributes
      },
      backdropDismiss: true,
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if(result){
      }
    });
  }
}
