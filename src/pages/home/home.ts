import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

import { DetailPage } from '../detail/detail';
import { summaryData, autocompleteData, addressData } from '../interfaces';
import { URL_FIXER, URL_FORECAST, URL_GEOBYTES, URL_GEOBYTES_CUR_LOC } from '../const';
import { Helper } from '../helper';

import 'moment-duration-format';
import * as moment from 'moment';


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  service = new google.maps.places.AutocompleteService();

  autocompleteItems: string[];
  autocomplete: autocompleteData;
  address: addressData;

  // Data related
  item: any;
  summary_data: summaryData;
  lat: number;
  lng: number;
  lat_current: number;
  lng_current: number;
  loading: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(private navCtrl: NavController, public viewCtrl: ViewController, private zone: NgZone, public loadingController: LoadingController, public navParams: NavParams, private http: HTTP, public helper: Helper, private alertCtrl: AlertController) {
    this.initialize();
  }

  ionViewWillEnter() {
    this.initialize()
  }

  initialize() {
    this.address = {
      place: ''
    };
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.lat = 0;
    this.lng = 0;
    this.lat_current = 0;
    this.lng_current = 0;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: string) {
    if (item != 'No results') {

      // Data related
      this.summary_data = { 
        name: item, 
        summary: '', 
        temperature: '', 
        time: '', 
        currency: '', 
        rate: '', 
        timediff: '', 
        timezone: '', 
        currencyname: '', 
        distance: 0, 
        flighttime: 0
      };
      this.item = this.summary_data.name.split(',')[0];

      this.loading = this.loadingController.create({ content: "Loading..." });
      this.loading.present();

      this.getCityDetails()
    }
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, types: ['(cities)'] }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        if (predictions == null) {
          me.autocompleteItems.push('No results');
        }
        else {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction.description);
          });
        }
      });
    });
  }

  // Fetch the data
  getCityDetails() {
    this.http.get(URL_GEOBYTES + this.item.replace(/ /g, "+"), {}, {})
      .then(data => {
        this.setCityDetails(JSON.parse(data.data));
      })
      .catch(error => {
        this.errorAlert()
        console.log(error.message);
      });
  };

  setCityDetails(data) {
    this.summary_data.timezone = data.geobytestimezone;
    this.summary_data.currencyname = data.geobytescurrency
    this.summary_data.currency = data.geobytescurrencycode

    this.lat = data.geobyteslatitude;
    this.lng = data.geobyteslongitude;

    this.getWeatherDetails(this.lat, this.lng);
  };

  getWeatherDetails(lat: number, lng: number) {
    this.http.get(URL_FORECAST + lat + ',' + lng, {}, {})
      .then(data => {
        this.setWeatherDetails(JSON.parse(data.data));
      })
      .catch(error => {
        this.errorAlert()
        console.log(error.message);
      });
  };

  setWeatherDetails(data) {
    this.summary_data.summary = data.currently.summary
    this.summary_data.temperature = ((data.currently.temperature - 32) * 5 / 9).toFixed(0)
    this.summary_data.time = moment(this.helper.toDateTime(data.currently.time)).format("YYYY-MM-DD HH:mm:ss");

    let now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.summary_data.timediff = moment.utc(moment(now, ).diff(moment(this.summary_data.time))).format("HH:mm:ss")

    this.getExchangeRateDetails(this.summary_data.currency);

    setTimeout(() => {
      this.loading.dismiss();
    }, 20000);
  };

  getCurrentCityDetails() {
    this.http.get(URL_GEOBYTES_CUR_LOC, {}, {})
      .then(data => {
        let results = JSON.parse(data.data);

        this.lat_current = results.geobyteslatitude;
        this.lng_current = results.geobyteslongitude;

        this.summary_data.distance = this.helper.getDistanceFromLatLonInKm(this.lat, this.lng, this.lat_current, this.lng_current);
        this.summary_data.flighttime = (this.summary_data.distance / 900);

        let latlng = new google.maps.LatLng(this.lat, this.lng);
        let latlng_current = new google.maps.LatLng(this.lat_current, this.lng_current);

        this.goToDetailPage(latlng, latlng_current)
      })
      .catch(error => {
        this.errorAlert()
        console.log(error.message);
      });
  };

  getExchangeRateDetails(currency: any) {
    this.http.get(URL_FIXER, {}, {})
      .then(data => {
        let results = JSON.parse(data.data);
        this.summary_data.rate = results.rates[currency]

        this.getCurrentCityDetails();
      })
      .catch(error => {
        this.errorAlert()
        console.log(error.message);
      });
  };

  goToDetailPage(latlng: any, latlng_current: any) {
    this.loading.dismissAll();
    this.navCtrl.push(DetailPage, {
      summary_data: this.summary_data,
      latlng: latlng,
      latlng_current: latlng_current,
    })

  }

  errorAlert() {
    this.loading.dismissAll();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'No data available for ' + this.item,
      buttons: ['Dismiss']
    });
    alert.present();
    this.initialize()
  }
}



