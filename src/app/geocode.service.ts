import { Geodata } from './geodata';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GeocodeService {

  // tslint:disable-next-line:max-line-length
  private urlgeocoder = 'http://maps.raleighnc.gov/arcgis/rest/services/Locators/CompositeLocator/GeocodeServer/findAddressCandidates?SingleLine=&category=&outFields=*&maxLocations=&outSR=4326&searchExtent=&location=&distance=&magicKey=&f=json&Street=';

  constructor(private http: Http) { }

  getGeometry(address): Observable<Geodata> {
    console.log('geoAddress = ', encodeURI(this.urlgeocoder) + encodeURIComponent(address));
    return this.http.get(encodeURI(this.urlgeocoder) + encodeURIComponent(address)).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
