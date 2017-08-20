import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
 
 import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(private geolocation: Geolocation) {
 
  }

  ionViewDidLoad(){
    this.initMap()
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
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 
}