import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Ad } from '../../_models/ad';
import { Comment } from '../../_models/comment';
import { AdsService } from '../../_services/ads.service';
import { AdCommentComponent } from '../ad-comment/ad-comment.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';

@Component({
  selector: 'app-ad-detail',
  standalone: true,
  imports: [CommonModule, 
    TabsModule, 
    GalleryModule, 
    AdCommentComponent,
    FormsModule,
    RouterModule],
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.css'
})
export class AdDetailComponent implements OnInit {
  ad: Ad | undefined;
  images: GalleryItem[] = []
  comments: Comment[] = [];
  newComment: any = {}
  member: Member | null = null;
  user: User | null =null;
  @ViewChild('commentForm') commentForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.commentForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private adsService: AdsService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService,
    private accountService: AccountService, 
    private memberService: MembersService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.loadAd();
    this.newComment.text = "";
    this.loadMember();
  }

  loadAd() {
    var id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.adsService.getAd(Number(id)).subscribe({
      next: ad => {
        this.ad = ad,
        this.getImages()
        this.getComments()
      }
    })
  }

  getImages() {
    if (!this.ad) return;
    for (const photo of this.ad?.photos) {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
  }

  getComments() {
    if (!this.ad) return;
    for (const comment of this.ad.comments) {
      this.comments.push(comment);
    }
  }

  CommentAd() {
    if (!this.ad || !this.commentForm || !this.newComment) return;

    this.newComment.adId = this.ad.id;
    this.adsService.commentAd(this.ad, this.newComment).subscribe({
      next: newComment => {
        this.toastr.success('Comment added succesfully');
        this.commentForm?.reset();
        this.newComment.text = "";
        this.comments.push(newComment);
      }
    })
  }
  
  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  likeAd() {
    if (!this.ad) return;
    if (!this.member) return;
    this.adsService.likeAd(this.ad, this.member.userName).subscribe({
      next: _ => {
        this.toastr.success('Advert liked succesfully');
      }
    })
    
  }
}

