import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryModule } from 'ng-gallery';
import { FormsModule, NgForm } from '@angular/forms';
import { Ad } from '../../_models/ad';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { AdsService } from '../../_services/ads.service';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-ad-upload',
  standalone: true,
  imports: [
    CommonModule, 
    TabsModule, 
    GalleryModule, 
    FormsModule],
  templateUrl: './ad-upload.component.html',
  styleUrl: './ad-upload.component.css'
})
export class AdUploadComponent implements OnInit {
    @ViewChild('editForm') editForm: NgForm | undefined;
    @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
      if (this.editForm?.dirty) {
        $event.returnValue = true;
      }
    }
    member: Member | null=null;
    ad: any = {};
    user: User | null =null;
  
    constructor(
      private accountService: AccountService, 
      private memberService: MembersService,
      private adsService: AdsService,
      private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => this.user = user
      })
    }
  
    ngOnInit(): void {
      this.loadMember();
    }
  
    loadMember() {
      if (!this.user) return;
      this.memberService.getMember(this.user.username).subscribe({
        next: member => this.member = member
      })
    }
  
    UploadAd() {
      this.ad.userId = this.member?.id;
      this.adsService.uploadAd(this.ad).subscribe({
        next: _ => {
          this.toastr.success('Advert uploaded succesfully');
          this.editForm?.reset(this.ad);
        }
      })
    }
  }
  
