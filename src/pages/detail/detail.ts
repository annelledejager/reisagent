import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'moment-duration-format';
import * as moment from 'moment';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
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
  url_w = 'https://api.forecast.io/forecast/' + '1771dccfc4b60079884874798e8def35' + '/';
  url_c = 'http://getcitydetails.geobytes.com/GetCityDetails?fqcn=' 

  @ViewChild('map') mapElement: ElementRef;
  map: any; 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    let item = navParams.get('item');
    this.item = item.split(',')[0]

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
            // let currencyname = results.geobytescurrency
            // let currency = results.geobytescurrencycode
            var lat_c = results.geobyteslatitude
            var lng_c = results.geobyteslongitude

            this.distance = this.getDistanceFromLatLonInKm(lat, lng, lat_c, lng_c).toFixed(0)
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
            this.time = moment(this.toDateTime(results.currently.time)).format("YYYY-MM-DD HH:mm:ss");
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
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    let marker = new google.maps.Marker({
      position: this.latlng,
      map: this.map,
    });
    
    var infowindow = new google.maps.InfoWindow();
    var html = `  <ion-list>
    <ion-item>
      Distance and flight duration<ion-icon name="navigate" item-end></ion-icon>
        <i class="wi wi-night-sleet"></i>
      <h5>` + this.distance +`km</h5>
      <h5>±` + this.flighttime + `hours</h5>
    </ion-item>`   
  //   <ion-item>    
  //     <i class="wi wi-night-sleet"></i>
  //     Temperature<ion-icon name="sunny" item-end></ion-icon>
  //   <h5>{{summary}}</h5>
  //     <span class="large">{{temperature}} °C</span>
  //   </ion-item>   
  //   <ion-item>            
  //     Currency<ion-icon name="card" item-end></ion-icon>
  //     <h5>{{currencyname}} </h5>
  //   </ion-item>
  //    <ion-item>            
  //     Exchange rate<ion-icon name="card" item-end></ion-icon>
  //     <h5>1 Euro : {{rate}} {{currency}}</h5>
  //   </ion-item>  
  //   <ion-item>                    
  //     Current date/time <ion-icon name="alarm" item-end></ion-icon>
  //       <h5>{{time}}</h5> 
  //       <h5>Time zone {{timezone}}</h5> 
  //   </ion-item> 
  //   <ion-item>                    
  //     Time difference <ion-icon name="alarm" item-end></ion-icon>  
  //      <h5>{{timediff}}</h5>  
  //   </ion-item>   
  // </ion-list>`
      infowindow.setContent(html);
      infowindow.open(this.map, marker)
  }
  
  toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }
  
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }

  deg2rad(deg) {
    return deg * (Math.PI/180)
   }
}
