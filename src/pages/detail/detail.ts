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
  url = 'https://api.forecast.io/forecast/' + '1771dccfc4b60079884874798e8def35' + '/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.item = navParams.get('item');

    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    var latitude  =  25.7877;
    var longitude = 80.2241;

    this.http.get(this.url + latitude + ',' + longitude + '?callback=JSON_CALLBACK', {}, {})
      .then(data => {

        console.log(data);
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {

        console.log(error)
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }
}
