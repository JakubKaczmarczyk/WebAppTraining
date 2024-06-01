import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdPhotoEditorComponent } from '../ad-photo-editor/ad-photo-editor.component';
import { AdsService } from '../../_services/ads.service';
import { Ad } from '../../_models/ad';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-edit',
  standalone: true,
  imports: [
    CommonModule, 
    TabsModule, 
    GalleryModule, 
    FormsModule,
    AdPhotoEditorComponent],
  templateUrl: './ad-edit.component.html',
  styleUrl: './ad-edit.component.css'
})
export class AdEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null =null;
  ad: Ad | undefined;
  images: GalleryItem[] = []

  constructor(
    private adsService: AdsService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    var adId = this.route.snapshot.paramMap.get('id');
    if (!adId) return;
    var adIdNr = parseInt(adId);
    if (!adIdNr) return;
    this.adsService.getAd(adIdNr).subscribe({
      next: ad => 
        this.ad = ad
    })
    if (this.ad) {
      this.getImages();
    }
    
  }

  updateAd() {
    if (!this.ad || !this.editForm) return;

    const updatedAd = {
      ...this.editForm.value,
      id: this.ad.id
    };
    this.adsService.updateAd(updatedAd).subscribe({
      next: _ => {
        this.toastr.success('Ad updated succesfully');
        this.editForm?.reset(this.ad);
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
