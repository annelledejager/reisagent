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
  url = 'https://api.forecast.io/forecast/' + '1771dccfc4b60079884874798e8def35' + '/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.item = navParams.get('item');

    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    var latitude  =  25.7877;
    var longitude = 80.2241;
    var currency = 'ZAR'
    var currentdate = new Date();

    this.http.get(this.url + latitude + ',' + longitude, {}, {})
      .then(data => {
        this.results = JSON.parse(data.data);
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

      this.currency = currency;

      this.timediff = currentdate.toLocaleString();
  }
}
