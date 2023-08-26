import { Component, OnInit } from '@angular/core';
import {CsvService} from "../../services/csv.service";
import {Project} from "../../models/project"
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
})
export class ProjectListPage implements OnInit {

  importedData : Project[] = [];
  displayedData : Project[] = [];
  projAttr : string[] = [];
  projAttrConvMap = new Map<string,string>();
  projAttrSelectable : string[] = ['missione','componente','iDMisura','iDSubmisura'];
  projAttrSelectableMap = new Map<string, string[]>();
  filterMap = new Map<string, string>();
  pageSize: number = 40;
  constructor(private csvService: CsvService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.csvService.getData().subscribe(value => this.importedData = value);
    this.projAttrConvMap = this.csvService.getPropertyMap();
    this.projAttr = this.csvService.getAttributes;
    //this.projAttrSelectable = this.csvService.getAttributes.slice(0, 5);
    this.displayedData = this.importedData.slice(0, this.pageSize);
    this.projAttrSelectable.forEach(value => this.projAttrSelectableMap.set(value, this.csvService.getOptionsByAttribute(value)));
  }

  attrChanged($event: any, proj: string) {
    this.filterMap.set(proj, $event.detail.value);
    this.csvService.applyFilters(this.filterMap);
    this.displayedData = this.importedData.slice(0, this.pageSize);
  }

  clearFilters($event: MouseEvent) {
    this.filterMap.clear();
    this.csvService.applyFilters(this.filterMap);
    this.displayedData = this.importedData.slice(0, this.pageSize);
  }

  editFilters($event: MouseEvent) {
    //adding or deleting filter fields for project list
  }

  loadNextBatch(event: any) {
    const startIndex = this.displayedData.length;
    const endIndex = startIndex + this.pageSize;

    if (startIndex < this.importedData.length) {
      this.displayedData = this.displayedData.concat(this.importedData.slice(startIndex, endIndex));
      event.target.complete();
    } else {
      event.target.disabled = true;
    }
  }

  async backButton($event: MouseEvent) {
    await this.navCtrl.pop();
  }
}
