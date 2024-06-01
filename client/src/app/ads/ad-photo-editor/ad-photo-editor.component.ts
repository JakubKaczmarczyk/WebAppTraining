import { Component, Input, OnInit } from '@angular/core';
import { FileUploadModule } from '@augwit/ng2-file-upload';
import { FileUploader } from '@augwit/ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { User } from '../../_models/user';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Photo } from '../../_models/photo';
import { AdsService } from '../../_services/ads.service';
import { Ad } from '../../_models/ad';

@Component({
  selector: 'app-ad-photo-editor',
  standalone: true,
  imports: [ 
    CommonModule, 
    TabsModule,
    FileUploadModule ],
  templateUrl: './ad-photo-editor.component.html',
  styleUrl: './ad-photo-editor.component.css'
})
export class AdPhotoEditorComponent implements OnInit {
  @Input() ad: Ad | undefined;
  uploader: FileUploader | undefined;
  baseUrl = environment.apiUrl;
  hasBaseDropzoneOver = false;

  constructor(private accountService: AccountService, private memberService: MembersService, 
    private adsService: AdsService,) {
  }

  ngOnInit(): void {
    if (this.ad) {
      this.uploader = new FileUploader({
        url: this.baseUrl + 'ads/add-photo/' + this.ad.id,
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
        });
    }

    if (this.uploader) {
      this.uploader
      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      }
  
      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          const photo = JSON.parse(response);
          this.ad?.photos.push(photo);
        }
      }
    }
  
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    if (!this.ad) return;
    this.adsService.setMainPhoto(this.ad, photo.id).subscribe({
      next: _ => {
          if (this.ad) {
          this.ad.photoUrl = photo.url;
          this.ad.photos.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photoId: number) {
    if (!this.ad) return;
    this.adsService.deletePhoto(this.ad, photoId).subscribe({
      next: _ => {
        if (this.ad) {
          this.ad.photos = this.ad?.photos.filter(x => x.id !== photoId)
        }
      }
    })
  }

}

