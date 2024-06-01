import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
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

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [ 
    CommonModule, 
    TabsModule,
    FileUploadModule ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  baseUrl = environment.apiUrl;
  user: User | undefined;
  hasBaseDropzoneOver = false;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user
      }
    })
    if (this.user) {
      console.log("here 1")
      this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    console.log("here 3")
    }
  }

  ngOnInit(): void {
    console.log("here 2")
    if (this.uploader) {
      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      }
  
      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          const photo = JSON.parse(response);
          this.member?.photos.push(photo);
        }
      }
    }
  
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: _ => {
        if (this.user && this.member) {
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: _ => {
        if (this.member) {
          this.member.photos = this.member?.photos.filter(x => x.id !== photoId)
        }
      }
    })
  }

}
