import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TweetsService {

  constructor(private http: HttpClient) { }

  // TODO: implement this against server side node persisted tweet db
  //   getMinedTweets(address): Observable<Tweets> {
  //   console.log('geoAddress = ', encodeURI(this.urlgeocoder) + encodeURIComponent(address));
  //   return this.http.get(encodeURI(this.urlgeocoder) + encodeURIComponent(address) + ('&City=raleigh')).map((res: Response) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

}
