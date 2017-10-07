webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__const__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment_duration_format__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment_duration_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment_duration_format__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, viewCtrl, zone, loadingController, navParams, http, helper, alertCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.loadingController = loadingController;
        this.navParams = navParams;
        this.http = http;
        this.helper = helper;
        this.alertCtrl = alertCtrl;
        this.service = new google.maps.places.AutocompleteService();
        this.initialize();
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.initialize();
    };
    HomePage.prototype.initialize = function () {
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
    };
    HomePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    HomePage.prototype.chooseItem = function (item) {
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
                distance: '',
            };
            this.item = this.summary_data.name.split(',')[0];
            this.loading = this.loadingController.create({ content: "Loading..." });
            this.loading.present();
            this.getCityDetails();
        }
    };
    HomePage.prototype.updateSearch = function () {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var me = this;
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
    };
    // Fetch the data
    HomePage.prototype.getCityDetails = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_4__const__["c" /* URL_GEOBYTES */] + this.item.replace(/ /g, "+"), {}, {})
            .then(function (data) {
            _this.setCityDetails(JSON.parse(data.data));
        })
            .catch(function (error) {
            _this.errorAlert();
            console.log(error.message);
        });
    };
    ;
    HomePage.prototype.setCityDetails = function (data) {
        this.summary_data.timezone = data.geobytestimezone;
        this.summary_data.currencyname = data.geobytescurrency;
        this.summary_data.currency = data.geobytescurrencycode;
        this.lat = data.geobyteslatitude;
        this.lng = data.geobyteslongitude;
        this.getWeatherDetails(this.lat, this.lng);
    };
    ;
    HomePage.prototype.getWeatherDetails = function (lat, lng) {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_4__const__["b" /* URL_FORECAST */] + lat + ',' + lng, {}, {})
            .then(function (data) {
            _this.setWeatherDetails(JSON.parse(data.data));
        })
            .catch(function (error) {
            _this.errorAlert();
            console.log(error.message);
        });
    };
    ;
    HomePage.prototype.setWeatherDetails = function (data) {
        var _this = this;
        this.summary_data.summary = data.currently.summary;
        this.summary_data.temperature = ((data.currently.temperature - 32) * 5 / 9).toFixed(0);
        this.summary_data.time = __WEBPACK_IMPORTED_MODULE_7_moment__(this.helper.toDateTime(data.currently.time)).format("YYYY-MM-DD HH:mm:ss");
        var now = __WEBPACK_IMPORTED_MODULE_7_moment__(new Date()).format("YYYY-MM-DD HH:mm:ss");
        this.summary_data.timediff = __WEBPACK_IMPORTED_MODULE_7_moment__["utc"](__WEBPACK_IMPORTED_MODULE_7_moment__(now).diff(__WEBPACK_IMPORTED_MODULE_7_moment__(this.summary_data.time))).format("HH:mm:ss");
        this.getExchangeRateDetails(this.summary_data.currency);
        setTimeout(function () {
            _this.loading.dismiss();
        }, 20000);
    };
    ;
    HomePage.prototype.getCurrentCityDetails = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_4__const__["d" /* URL_GEOBYTES_CUR_LOC */], {}, {})
            .then(function (data) {
            var results = JSON.parse(data.data);
            _this.lat_current = results.geobyteslatitude;
            _this.lng_current = results.geobyteslongitude;
            var distance = _this.helper.getDistanceFromLatLonInKm(_this.lat, _this.lng, _this.lat_current, _this.lng_current);
            _this.summary_data.distance = distance.toFixed(0);
            var latlng = new google.maps.LatLng(_this.lat, _this.lng);
            var latlng_current = new google.maps.LatLng(_this.lat_current, _this.lng_current);
            _this.goToDetailPage(latlng, latlng_current);
        })
            .catch(function (error) {
            _this.errorAlert();
            console.log(error.message);
        });
    };
    ;
    HomePage.prototype.getExchangeRateDetails = function (currency) {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_4__const__["a" /* URL_FIXER */], {}, {})
            .then(function (data) {
            var results = JSON.parse(data.data);
            _this.summary_data.rate = results.rates[currency];
            _this.getCurrentCityDetails();
        })
            .catch(function (error) {
            _this.errorAlert();
            console.log(error.message);
        });
    };
    ;
    HomePage.prototype.goToDetailPage = function (latlng, latlng_current) {
        this.loading.dismissAll();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], {
            summary_data: this.summary_data,
            latlng: latlng,
            latlng_current: latlng_current,
        });
    };
    HomePage.prototype.errorAlert = function () {
        this.loading.dismissAll();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'No data available for ' + this.item,
            buttons: ['Dismiss']
        });
        alert.present();
        this.initialize();
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "mapElement", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'home-page',template:/*ion-inline-start:"/Users/annelledejager/reisagent/src/pages/home/home.html"*/'<ion-content id=\'home-page\'>\n  <ion-searchbar [(ngModel)]="autocomplete.query" (ionInput)="updateSearch()" (ionCancel)="dismiss()" placeholder="Enter city here"></ion-searchbar>\n  <ion-item *ngFor="let item of autocompleteItems" tappable (click)="chooseItem(item)">\n    {{ item }}\n  </ion-item>\n</ion-content>'/*ion-inline-end:"/Users/annelledejager/reisagent/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_5__helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_duration_format__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_duration_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment_duration_format__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DetailPage = (function () {
    function DetailPage(loadingController, navParams) {
        this.loadingController = loadingController;
        this.navParams = navParams;
        this.summary_data = navParams.get('summary_data');
        this.latlng = navParams.get('latlng');
        this.latlng_current = navParams.get('latlng_current');
    }
    DetailPage.prototype.ionViewWillEnter = function () {
        var bounds;
        bounds = new google.maps.LatLngBounds();
        this.addMarker(bounds, this.latlng);
        this.addMarker(bounds, this.latlng_current);
        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.map.fitBounds(bounds); // auto-zoom
        this.map.panToBounds(bounds); // auto-center
        new google.maps.Polyline({
            path: [this.latlng, this.latlng_current],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 1,
            map: this.map
        });
    };
    DetailPage.prototype.addMarker = function (bounds, latlng) {
        var marker;
        var loc;
        marker = new google.maps.Marker({
            position: latlng,
            map: this.map,
        });
        loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        bounds.extend(loc);
    };
    return DetailPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], DetailPage.prototype, "mapElement", void 0);
DetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-detail',template:/*ion-inline-start:"/Users/annelledejager/reisagent/src/pages/detail/detail.html"*/'<ion-header>\n  <ion-navbar>\n  </ion-navbar>\n</ion-header>\n\n<ion-content id=\'detail-page\'>\n  <ion-title>{{summary_data.name}}</ion-title>\n  <div>\n    <ion-list>\n      <b>\n        <p>{{summary_data.distance}} km</p>\n        <p>{{summary_data.summary}}, {{summary_data.temperature}} °C</p>\n        <p>{{summary_data.currencyname}} </p>\n        <p>1 Euro : {{summary_data.rate}} {{summary_data.currency}}</p>\n        <p>{{summary_data.time}}</p> \n        <p>Time zone {{summary_data.timezone}}</p> \n        <p>{{summary_data.timediff}}</p>  \n      </b>\n    </ion-list>\n  </div>\n  <div #outerdiv id="outerdiv">\n    <div #map id="map"></div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/annelledejager/reisagent/src/pages/detail/detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], DetailPage);

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Helper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.toDateTime = function (secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    };
    Helper.prototype.getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    };
    Helper.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    return Helper;
}());
Helper = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], Helper);

//# sourceMappingURL=helper.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(331);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_detail_detail__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_helper__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(385);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_detail_detail__["a" /* DetailPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_detail_detail__["a" /* DetailPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_6__pages_helper__["a" /* Helper */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //   statusBar.styleDefault();
            //   splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/annelledejager/reisagent/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/annelledejager/reisagent/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 196,
	"./af.js": 196,
	"./ar": 197,
	"./ar-dz": 198,
	"./ar-dz.js": 198,
	"./ar-kw": 199,
	"./ar-kw.js": 199,
	"./ar-ly": 200,
	"./ar-ly.js": 200,
	"./ar-ma": 201,
	"./ar-ma.js": 201,
	"./ar-sa": 202,
	"./ar-sa.js": 202,
	"./ar-tn": 203,
	"./ar-tn.js": 203,
	"./ar.js": 197,
	"./az": 204,
	"./az.js": 204,
	"./be": 205,
	"./be.js": 205,
	"./bg": 206,
	"./bg.js": 206,
	"./bn": 207,
	"./bn.js": 207,
	"./bo": 208,
	"./bo.js": 208,
	"./br": 209,
	"./br.js": 209,
	"./bs": 210,
	"./bs.js": 210,
	"./ca": 211,
	"./ca.js": 211,
	"./cs": 212,
	"./cs.js": 212,
	"./cv": 213,
	"./cv.js": 213,
	"./cy": 214,
	"./cy.js": 214,
	"./da": 215,
	"./da.js": 215,
	"./de": 216,
	"./de-at": 217,
	"./de-at.js": 217,
	"./de-ch": 218,
	"./de-ch.js": 218,
	"./de.js": 216,
	"./dv": 219,
	"./dv.js": 219,
	"./el": 220,
	"./el.js": 220,
	"./en-au": 221,
	"./en-au.js": 221,
	"./en-ca": 222,
	"./en-ca.js": 222,
	"./en-gb": 223,
	"./en-gb.js": 223,
	"./en-ie": 224,
	"./en-ie.js": 224,
	"./en-nz": 225,
	"./en-nz.js": 225,
	"./eo": 226,
	"./eo.js": 226,
	"./es": 227,
	"./es-do": 228,
	"./es-do.js": 228,
	"./es.js": 227,
	"./et": 229,
	"./et.js": 229,
	"./eu": 230,
	"./eu.js": 230,
	"./fa": 231,
	"./fa.js": 231,
	"./fi": 232,
	"./fi.js": 232,
	"./fo": 233,
	"./fo.js": 233,
	"./fr": 234,
	"./fr-ca": 235,
	"./fr-ca.js": 235,
	"./fr-ch": 236,
	"./fr-ch.js": 236,
	"./fr.js": 234,
	"./fy": 237,
	"./fy.js": 237,
	"./gd": 238,
	"./gd.js": 238,
	"./gl": 239,
	"./gl.js": 239,
	"./gom-latn": 240,
	"./gom-latn.js": 240,
	"./he": 241,
	"./he.js": 241,
	"./hi": 242,
	"./hi.js": 242,
	"./hr": 243,
	"./hr.js": 243,
	"./hu": 244,
	"./hu.js": 244,
	"./hy-am": 245,
	"./hy-am.js": 245,
	"./id": 246,
	"./id.js": 246,
	"./is": 247,
	"./is.js": 247,
	"./it": 248,
	"./it.js": 248,
	"./ja": 249,
	"./ja.js": 249,
	"./jv": 250,
	"./jv.js": 250,
	"./ka": 251,
	"./ka.js": 251,
	"./kk": 252,
	"./kk.js": 252,
	"./km": 253,
	"./km.js": 253,
	"./kn": 254,
	"./kn.js": 254,
	"./ko": 255,
	"./ko.js": 255,
	"./ky": 256,
	"./ky.js": 256,
	"./lb": 257,
	"./lb.js": 257,
	"./lo": 258,
	"./lo.js": 258,
	"./lt": 259,
	"./lt.js": 259,
	"./lv": 260,
	"./lv.js": 260,
	"./me": 261,
	"./me.js": 261,
	"./mi": 262,
	"./mi.js": 262,
	"./mk": 263,
	"./mk.js": 263,
	"./ml": 264,
	"./ml.js": 264,
	"./mr": 265,
	"./mr.js": 265,
	"./ms": 266,
	"./ms-my": 267,
	"./ms-my.js": 267,
	"./ms.js": 266,
	"./my": 268,
	"./my.js": 268,
	"./nb": 269,
	"./nb.js": 269,
	"./ne": 270,
	"./ne.js": 270,
	"./nl": 271,
	"./nl-be": 272,
	"./nl-be.js": 272,
	"./nl.js": 271,
	"./nn": 273,
	"./nn.js": 273,
	"./pa-in": 274,
	"./pa-in.js": 274,
	"./pl": 275,
	"./pl.js": 275,
	"./pt": 276,
	"./pt-br": 277,
	"./pt-br.js": 277,
	"./pt.js": 276,
	"./ro": 278,
	"./ro.js": 278,
	"./ru": 279,
	"./ru.js": 279,
	"./sd": 280,
	"./sd.js": 280,
	"./se": 281,
	"./se.js": 281,
	"./si": 282,
	"./si.js": 282,
	"./sk": 283,
	"./sk.js": 283,
	"./sl": 284,
	"./sl.js": 284,
	"./sq": 285,
	"./sq.js": 285,
	"./sr": 286,
	"./sr-cyrl": 287,
	"./sr-cyrl.js": 287,
	"./sr.js": 286,
	"./ss": 288,
	"./ss.js": 288,
	"./sv": 289,
	"./sv.js": 289,
	"./sw": 290,
	"./sw.js": 290,
	"./ta": 291,
	"./ta.js": 291,
	"./te": 292,
	"./te.js": 292,
	"./tet": 293,
	"./tet.js": 293,
	"./th": 294,
	"./th.js": 294,
	"./tl-ph": 295,
	"./tl-ph.js": 295,
	"./tlh": 296,
	"./tlh.js": 296,
	"./tr": 297,
	"./tr.js": 297,
	"./tzl": 298,
	"./tzl.js": 298,
	"./tzm": 299,
	"./tzm-latn": 300,
	"./tzm-latn.js": 300,
	"./tzm.js": 299,
	"./uk": 301,
	"./uk.js": 301,
	"./ur": 302,
	"./ur.js": 302,
	"./uz": 303,
	"./uz-latn": 304,
	"./uz-latn.js": 304,
	"./uz.js": 303,
	"./vi": 305,
	"./vi.js": 305,
	"./x-pseudo": 306,
	"./x-pseudo.js": 306,
	"./yo": 307,
	"./yo.js": 307,
	"./zh-cn": 308,
	"./zh-cn.js": 308,
	"./zh-hk": 309,
	"./zh-hk.js": 309,
	"./zh-tw": 310,
	"./zh-tw.js": 310
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 382;

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return URL_FORECAST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return URL_GEOBYTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return URL_GEOBYTES_CUR_LOC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return URL_FIXER; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_config__ = __webpack_require__(384);

var URL_FORECAST = 'https://api.forecast.io/forecast/' + __WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* API_KEY_FORECAST */] + '/';
var URL_GEOBYTES = 'http://getcitydetails.geobytes.com/GetCityDetails?fqcn=';
var URL_GEOBYTES_CUR_LOC = 'http://gd.geobytes.com/GetCityDetails';
var URL_FIXER = 'http://api.fixer.io/latest';
//# sourceMappingURL=const.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export API_KEY_GOOGLE_MAPS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_KEY_FORECAST; });
// Google Maps
// Google Maps
var API_KEY_GOOGLE_MAPS = 'AIzaSyB1_WvVoInqg-a1cFHmcvtZLGGokvnKl38';
// Forecast 
var API_KEY_FORECAST = '1771dccfc4b60079884874798e8def35';
//# sourceMappingURL=config.js.map

/***/ })

},[312]);
//# sourceMappingURL=main.js.map