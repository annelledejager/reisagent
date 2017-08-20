import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ViewController} from 'ionic-angular';

import { DetailPage } from '../detail/detail';
 
 import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();
 
  @ViewChild('map') mapElement: ElementRef;
  map: any; 
  address;
 
  constructor(private geolocation: Geolocation, private navCtrl: NavController, public viewCtrl: ViewController, private zone: NgZone) {
    this.address = {
      place: ''
    };

    this.autocompleteItems = [];
      this.autocomplete = {
      query: ''
    };
  }

  ionViewDidLoad(){
    // this.initMap()
  }

  initMap(){
    this.geolocation.getCurrentPosition().then((resp) => {
      let lat = resp.coords.latitude
      let lng = resp.coords.longitude
      let latlng = new google.maps.LatLng(lat,lng);
      
      let mapOptions = {
        center: latlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    new google.maps.Marker({
      position: latlng,
      map: this.map,
    });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
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
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }
}



