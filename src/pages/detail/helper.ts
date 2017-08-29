
import {Injectable} from "@angular/core";

@Injectable()
export class Helper {
    toDateTime(secs) {
        let t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }

    getDistanceFromLatLonInKm(lat1: number,lon1: number,lat2: number,lon2: number) {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2-lon1); 
        let a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c; // Distance in km
        return d;
    }

    private deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    getCenter(lat1: number,lon1: number,lat2: number,lon2: number)  {
        this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)/2;
    };
}


