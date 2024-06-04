import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ad } from '../_models/ad';
import { Comment } from '../_models/comment';
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
    return this.http.put(this.baseUrl + 'ads/updateAd', ad).pipe(
      map(() => {
        const index = this.ads.indexOf(ad);
        this.ads[index] = {...this.ads[index], ...ad}
      })
    )
  }

  uploadAd(ad: Ad) {
    return this.http.post(this.baseUrl + 'ads/uploadAd', ad).pipe(
      map(() => {
        const index = this.ads.indexOf(ad);
        this.ads[index] = {...this.ads[index], ...ad}
      })
    )

  }

  likeAd(ad: Ad, username: string) {
    const url = `${this.baseUrl}ads/like/${ad.id}/${username}`;
    return this.http.post(url, {});
  }

  commentAd(ad: Ad, comment: Comment) {
    return this.http.post<Comment>(this.baseUrl + 'ads/comment', comment).pipe(
      map((response: Comment) => {
        const newComment = response;
        ad.comments.push(newComment);
        return newComment;
      })
    )
  }

  setMainPhoto(ad: Ad, photoId: number) {
    return this.http.put(this.baseUrl + 'ads/set-main-photo/' + ad.id + "/" + photoId, {});
  }

  deletePhoto(ad: Ad, photoId: number) {
    return this.http.delete(this.baseUrl + 'ads/delete-photo/' + ad.id + "/" + photoId);
  }
}
