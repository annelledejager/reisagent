import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Helper }  from '../detail/helper';
import 'moment-duration-format';
import * as moment from 'moment';

interface summaryData {
  summary: string;
  temperature: string;
  time: string;
  currency: string;
  rate: string;
  timediff: string;
  timezone: string;
  currencyname: string;
  distance: number;
  flighttime: number;
}


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: any;
  summary_data: summaryData;
  lat: number;
  lng: number;
  lat_current: number;
  lng_current: number;

  url_w = 'https://api.forecast.io/forecast/' + '1771dccfc4b60079884874798e8def35' + '/';
  url_c = 'http://getcitydetails.geobytes.com/GetCityDetails?fqcn=' 

  @ViewChild('map') mapElement: ElementRef;
  map: any; 
  
  constructor(public navParams: NavParams, private http: HTTP, public helper: Helper) {
    this.item = navParams.get('item').split(',')[0];

    this.summary_data = {  summary: '', temperature: '', time: '', currency: '', rate: '', timediff: '', timezone: '', currencyname: '', distance: 0, flighttime: 0};
    this.helper = helper;

    this.lat = 0;
    this.lng = 0;
    this.lat_current = 0;
    this.lng_current = 0;

    this.ionViewDidLoad();
  }

  ionViewDidLoad() {

    this.getCityDetails();
  }

  getCityDetails(){
      this.http.get(this.url_c + this.item.replace(/ /g,"+"), {}, {})
      .then(data => {
        this.setCityDetails(JSON.parse(data.data)); 
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  setCityDetails(data){
    this.summary_data.timezone = data.geobytestimezone;
    this.summary_data.currencyname = data.geobytescurrency
    this.summary_data.currency = data.geobytescurrencycode
    
    this.lat = data.geobyteslatitude;
    this.lng = data.geobyteslongitude;

    this.getWeatherDetails(this.lat, this.lng);
  };

  getWeatherDetails(lat: number, lng: number){
      this.http.get(this.url_w + lat + ',' + lng, {}, {})
        .then(data => {
          this.setWeatherDetails(JSON.parse(data.data));
        })
        .catch(error => {
          console.log(error.message);
        }); 
  };

  setWeatherDetails(data){
    this.summary_data.summary = data.currently.summary
    this.summary_data.temperature = ((data.currently.temperature - 32) * 5/9).toFixed(0)
    this.summary_data.time = moment(this.helper.toDateTime(data.currently.time)).format("YYYY-MM-DD HH:mm:ss");
    
    let now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.summary_data.timediff = moment.utc(moment(now,).diff(moment(this.summary_data.time))).format("HH:mm:ss")

    this.getExchangeRateDetails(this.summary_data.currency);
  };

  getCurrentCityDetails(){
    this.http.get('http://gd.geobytes.com/GetCityDetails', {}, {})
      .then(data => {
        let results = JSON.parse(data.data);
        
        this.lat_current = results.geobyteslatitude;
        this.lng_current = results.geobyteslongitude;

        this.summary_data.distance = this.helper.getDistanceFromLatLonInKm(this.lat, this.lng, this.lat_current, this.lng_current)
        this.summary_data.flighttime = (this.summary_data.distance/900)

        let latlng = new google.maps.LatLng(this.lat,this.lng);
        let latlng_current = new google.maps.LatLng(this.lat_current,this.lng_current);

        this.initMap(latlng, latlng_current)
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  getExchangeRateDetails(currency: any){
    this.http.get('http://api.fixer.io/latest', {}, {})
      .then(data => {
        let results = JSON.parse(data.data);
        this.summary_data.rate  = results.rates[currency]

        this.getCurrentCityDetails();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  initMap(latlng: any, latlng_current: any){
    let mapOptions = {
        center: latlng,
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    new google.maps.Marker({
      position: latlng,
      map: this.map,
    });

    new google.maps.Polyline({
        path: [latlng, latlng_current],
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
        map: this.map
    });
  }
}
