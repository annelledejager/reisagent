import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = '';
  items: string[];
  results: any;

  constructor(public navCtrl: NavController, private http: HTTP) {
    // this.initializeItems();
  }

  // initializeItems() {
  //   this.http.get("http://gd.geobytes.com/AutoCompleteCity?&q=" + this.item, {}, {})
  //     .then(data => {
  //       this.items  = JSON.parse(data.data);
  //     })
  //     .catch(error => {
  //       console.log(error.status);
  //     });
  // }

  getItems(ev: any) {
    // Reset items back to all of the items
//    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    this.http.get("http://gd.geobytes.com/AutoCompleteCity?&q=Cap" + val, {}, {})
      .then(data => {
        this.items = JSON.parse(data.data);
      })
      .catch(error => {
        this.items = error.status
        console.log(error.status);
      });    

    // // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }

  itemSelected(item){
    this.navCtrl.push(DetailPage, {
      item: item
    })
  }
}