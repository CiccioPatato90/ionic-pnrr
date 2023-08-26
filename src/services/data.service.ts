
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage-angular";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }
  private async init() {
    this._storage = await this.storage.create();
  }
}
