import { Component, NgZone } from '@angular/core';
import { NavController, ViewController} from 'ionic-angular';

import { DetailPage } from '../detail/detail';
 

interface addressData {
   place: string;
}

interface autocompleteData {
   query: string;
}

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  service = new google.maps.places.AutocompleteService(); 

  autocompleteItems: string[];
  autocomplete: autocompleteData;
  address: addressData;
 
  constructor(private navCtrl: NavController, public viewCtrl: ViewController, private zone: NgZone) {
    this.address = {
      place: ''
    };
    this.autocompleteItems = [];   
    this.autocomplete = {
      query: ''
    };
  }

  ionViewWillEnter() {
    this.address = {
      place: ''
    };
    this.autocompleteItems = [];   
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: string) {
    this.navCtrl.push(DetailPage, {
      item: item
    })
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, types: ['(cities)']}, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if (predictions == null){
          me.autocompleteItems.push('No results');
        }
        else{  
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction.description);
          });
        }
      });
    });
  }
}



