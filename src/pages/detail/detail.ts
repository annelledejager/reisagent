import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { summaryData } from '../interfaces';
import 'moment-duration-format';
import * as moment from 'moment';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  summary_data: summaryData;
  latlng: any;
  latlng_current: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public loadingController: LoadingController, public navParams: NavParams, private http: HTTP) {
    this.summary_data = navParams.get('summary_data')
    this.latlng = navParams.get('latlng')
    this.latlng_current = navParams.get('latlng_current')
  }

  ionViewWillEnter() {
    let bounds: any;

    bounds = new google.maps.LatLngBounds();

    this.addMarker(bounds, this.latlng);
    this.addMarker(bounds, this.latlng_current);

    let mapOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    this.map.fitBounds(bounds);       // auto-zoom
    this.map.panToBounds(bounds);     // auto-center

    new google.maps.Polyline({
      path: [this.latlng, this.latlng_current],
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 1,
      map: this.map
    });
  }

  addMarker(bounds: any, latlng: any) {
    let marker: any;
    let loc: any;

    marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
    });

    loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
    bounds.extend(loc);
  }
}
