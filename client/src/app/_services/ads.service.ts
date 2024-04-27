import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ad } from '../_models/ad';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  baseUrl = environment.apiUrl;
  ads: Ad[] = [];

  constructor(private http: HttpClient) { }

  getAds() {
    if (this.ads.length > 0) return of(this.ads);
    return this.http.get<Ad[]>(this.baseUrl + 'ads').pipe(
      map(ads => {
        this.ads = ads;
        return ads;
      })
    )
  }

  getAd(id: number) {
    const ad = this.ads.find(x => x.id == id);
    if (ad) return of(ad);
    return this.http.get<Ad>(this.baseUrl + 'ads/' + id);
  }

  updateAd(ad: Ad) {
    return this.http.put(this.baseUrl + 'ads', ad).pipe(
      map(() => {
        const index = this.ads.indexOf(ad);
        this.ads[index] = {...this.ads[index], ...ad}
      })
    )
  }

  uploadAd(ad: Ad) {
    return this.http.post(this.baseUrl + 'ads', ad).pipe(
      map(() => {
        const index = this.ads.indexOf(ad);
        this.ads[index] = {...this.ads[index], ...ad}
      })
    )

  }
}
