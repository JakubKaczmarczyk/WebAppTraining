import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Ad } from '../../_models/ad';
import { AdsService } from '../../_services/ads.service';

@Component({
  selector: 'app-ad-detail',
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule],
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.css'
})
export class AdDetailComponent implements OnInit{
  ad: Ad | undefined;
  images: GalleryItem[] = []

  constructor(private adsService: AdsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAd();
  }

  loadAd() {
    var id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.adsService.getAd(Number(id)).subscribe({
      next: ad => {
        this.ad = ad,
        this.getImages()
      }
    })
  }

  getImages() {
    if (!this.ad) return;
    for (const photo of this.ad?.photos) {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
  }
}
