import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

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
  results: any;
  summary: any;
  temperature: any;
  time: any;
  currency: any;
  rate: any;
  timediff: any;
  timezone: any;
  currencyname: any;
  url_w = 'https://api.forecast.io/forecast/' + '1771dccfc4b60079884874798e8def35' + '/';
  url_c = 'http://getcitydetails.geobytes.com/GetCityDetails?fqcn=' + this.item

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.item = navParams.get('item');

    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    var currency = 'ZAR'
    var currentdate = new Date();
    var lat = 0
    var lng = 0

    this.http.get(this.url_c, {}, {})
      .then(data => {
        this.results  = JSON.parse(data.data);
        this.timezone = this.results.geobytestimezone
        this.currencyname = this.results.geobytescurrency
        this.currency = this.results.geobytescurrencycode
        lat = this.results.geobyteslatitude
        lng = this.results.geobyteslongitude
      })
      .catch(error => {
        console.log(error.status);
      });

      this.http.get(this.url_w + lat + ',' + lng, {}, {})
      .then(data => {
        this.results  = JSON.parse(data.data);
        this.summary = this.results.currently.summary
        this.temperature = ((this.results.currently.temperature - 32) * 5/9).toFixed(2)
        this.time = this.results.currently.time
      })
      .catch(error => {
        console.log(error.status);
      });  

    this.http.get('http://api.fixer.io/latest', {}, {})
      .then(data => {
        this.rate = JSON.parse(data.data);
        this.rate = this.rate.rates.ZAR
      })
      .catch(error => {
        console.log(error.status);
      });

      this.timediff = currentdate.toLocaleString();
  }
}
