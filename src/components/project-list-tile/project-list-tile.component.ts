import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../models/project";
import {CsvService} from "../../services/csv.service";

@Component({
  selector: 'app-project-list-tile',
  templateUrl: './project-list-tile.component.html',
  styleUrls: ['./project-list-tile.component.scss'],
})
export class ProjectListTileComponent implements OnInit {

  @Input() projects?: Project[];
  @Input() attributes?: string[];
  convMap = new Map<string, string>();
  constructor(private csvService: CsvService) { }

  ngOnInit() {
    this.convMap = this.csvService.getPropertyMap();
  }

}
