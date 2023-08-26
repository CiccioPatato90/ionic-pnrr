import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-group-by-popup',
  templateUrl: './group-by-popup.component.html',
  styleUrls: ['./group-by-popup.component.scss'],
})
export class GroupByPopupComponent  implements OnInit {

  @Input() attributes? : string[];
  checkBoxItems= new  Map<string, boolean>();
  constructor(private modalController: ModalController) { }

  ngOnInit(){
    for (let attr in this.attributes){
      this.checkBoxItems.set(attr, false);
    }
  }

  dismissModal() {
    const trueValuesArray: string[] = [];
    for (const entry of this.checkBoxItems.entries()) {
      console.log('ENTRY', entry);
      if (entry[1]) {
        trueValuesArray.push(entry[0]);
      }
    }

    this.modalController.dismiss({
      selectedAttributes: trueValuesArray,
    });
  }

  toggleCheckbox(attr: string, event: any) {
   this.checkBoxItems.set(attr, !this.checkBoxItems.get(attr));
  }
}
