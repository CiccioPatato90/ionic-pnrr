import { Injectable } from '@angular/core';
import {Project} from "../models/project";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  private importedData : Project[] = [];
  private projectAttributes : string[] = [];
  private $data: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  private $filters: BehaviorSubject<Map<string, string>> = new BehaviorSubject<Map<string, string>>(new Map);
  private propertyMap = new Map<string, string>();
  constructor() { }

  importDataFromCSV(csvText: string) {

    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(';');
    console.log('PROPERTY NAMES: ', propertyNames);

    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
    let dataArray= new Array<Project>();

    dataRows.forEach((row) => {
      let values = row.split(';');
      let obj: Project = {};
      for (let index = 0; index < propertyNames.length; index++) {
        const propName: string = propertyNames[index].replace(/\s+/g, '').replace(/^./, m => m.toLowerCase()).replace(/\s\w/g, m => m.toUpperCase()).replace(/\s/g, '');
        obj[propName] = values[index];
      }
      dataArray.push(obj);
    });
    console.log('CREATED ARRAY', dataArray);
    this.importedData = dataArray;
    //convert to json
    console.log('STRINGIFY: ', JSON.stringify(dataArray[0]));
    this.$data.next(dataArray);
    this.projectAttributes = Object.keys(this.importedData[0]);

    this.projectAttributes.forEach((value, index) => this.propertyMap.set(value, propertyNames[index]))
  }

  get getAttributes(): string[]{
    return this.projectAttributes;
  }

  getData(): Observable<Project[]> {
    return this.$data;
  }

  getPropertyMap(): Map<string, string> {
    return this.propertyMap;
  }

  getOptionsByAttribute(attribute: string): string[]{
    let uniqueValuesSet = new Set<string>();

    for (let project of this.importedData) {
      let value = project[attribute];
      if (value) {
        uniqueValuesSet.add(value);
      }
    }
    return Array.from(uniqueValuesSet);
  }

  updateFilters(filters: Map<string, string>, data: Project[]) {
    return [];
  }

  applyFilters(filters: Map<string, string>): void {
    if(filters.size === 0){
      this.$data.next(this.importedData);
    }
    else{
      const filteredResults = this.importedData.filter(item => {
        for (const [key, value] of filters) {
          if (item[key] !== value) {
            return false;
          }
        }
        return true;
      });

      console.log('filteredResults', filteredResults);

      this.$data.next(filteredResults);
    }
  }
}
