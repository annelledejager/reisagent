import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'moment-duration-format';
import * as moment from 'moment';
import { Helper }  from '../detail/helper'


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: any;
  summary: any;
  temperature: any;
  time: any;
  currency: any;
  rate: any;
  timediff: any;
  timezone: any;
  currencyname: any;
  distance: any;
  flighttime: any;
  latlng: any;
  latlng_current: any;
  url_w = 'https://api.forecast.io/forecast/' + '1771dccfc4b60079884874798e8def35' + '/';
  url_c = 'http://getcitydetails.geobytes.com/GetCityDetails?fqcn=' 

  @ViewChild('map') mapElement: ElementRef;
  map: any; 
  
  constructor(public navParams: NavParams, private http: HTTP, public helper: Helper) {
    let item = navParams.get('item');
    this.item = item.split(',')[0]

    this.helper = helper

    this.ionViewDidLoad();

  }

  ionViewDidLoad() {
    this.http.get(this.url_c + this.item.replace(/ /g,"+"), {}, {})
      .then(data => {
        let results  = JSON.parse(data.data);
        this.timezone = results.geobytestimezone;
        this.currencyname = results.geobytescurrency
        this.currency = results.geobytescurrencycode
        let lat = results.geobyteslatitude
        let lng = results.geobyteslongitude
        this.latlng = new google.maps.LatLng(lat,lng);

        this.http.get('http://api.fixer.io/latest', {}, {})
        .then(data => {
          let results = JSON.parse(data.data);
          this.rate = results.rates[this.currency]
        })
        .catch(error => {
          console.log(error.message);
          console.log(error.status);
        });
        
        this.http.get('http://gd.geobytes.com/GetCityDetails', {}, {})
          .then(data => {
            let results  = JSON.parse(data.data);
            var lat_c = results.geobyteslatitude
            var lng_c = results.geobyteslongitude
            this.latlng_current = new google.maps.LatLng(lat_c,lng_c);

            this.distance = this.helper.getDistanceFromLatLonInKm(lat, lng, lat_c, lng_c).toFixed(0)
            this.flighttime = (this.distance/900).toFixed(0)
          })
          .catch(error => {
            console.log(error.message);
            console.log(error.status);
          });

        this.http.get(this.url_w + lat + ',' + lng, {}, {})
          .then(data => {
            let results  = JSON.parse(data.data);
            this.summary = results.currently.summary
            this.temperature = ((results.currently.temperature - 32) * 5/9).toFixed(0)
            this.time = moment(this.helper.toDateTime(results.currently.time)).format("YYYY-MM-DD HH:mm:ss");
            let now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            this.timediff = moment.utc(moment(now,).diff(moment(this.time))).format("HH:mm:ss")


            this.initMap()
          })
          .catch(error => {
            console.log(error.message);
            console.log(error.status);
          }); 
        })
      .catch(error => {
        console.log(error.message);
        console.log(error.status);
      });
  }

  initMap(){
      
    let mapOptions = {
        center: this.latlng,
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    new google.maps.Marker({
      position: this.latlng,
      map: this.map,
    });

    new google.maps.Polyline({
        path: [this.latlng, this.latlng_current],
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
        map: this.map
    });
  }
}
