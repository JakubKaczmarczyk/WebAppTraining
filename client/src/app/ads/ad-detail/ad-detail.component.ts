import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Ad } from '../../_models/ad';
import { AdsService } from '../../_services/ads.service';
import { AdCommentComponent } from '../ad-comment/ad-comment.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ad-detail',
  standalone: true,
  imports: [CommonModule, 
    TabsModule, 
    GalleryModule, 
    AdCommentComponent,
    FormsModule],
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.css'
})
export class AdDetailComponent implements OnInit{
  ad: Ad | undefined;
  images: GalleryItem[] = []
  newComment: any = {}
  @ViewChild('commentForm') commentForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.commentForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private adsService: AdsService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadAd();
    this.newComment.text = "";
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

  CommentAd() {
    if (!this.ad || !this.commentForm || !this.newComment) return;

    this.newComment.adId = this.ad.id;
    this.adsService.commentAd(this.ad, this.newComment).subscribe({
      next: _ => {
        this.toastr.success('Comment added succesfully');
        this.commentForm?.reset();
        this.newComment.text = "";
        this.loadAd();
      }
    })
  }
}
