import { Component, OnInit } from '@angular/core';
import { Ad } from '../../_models/ad';
import { AdsService } from '../../_services/ads.service';
import { CommonModule } from '@angular/common';
import { Observable, of, take } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { FavAdCardComponent } from '../fav-ad-card/fav-ad-card.component';

@Component({
  selector: 'fav-app-ads-list',
  standalone: true,
  imports: [CommonModule, FavAdCardComponent, RouterModule],
  templateUrl: './fav-ads-list.component.html',
  styleUrl: './fav-ads-list.component.css'
})
export class FavAdsListComponent implements OnInit {
  ads:Ad[] = [];
  member: Member | null = null;
  user: User | null =null;

  constructor(
    private accountService: AccountService, 
    private memberService: MembersService) {
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
      next: member => {
        this.member = member;
        this.loadFavAds();
      }
    })
  }

  loadFavAds() {
    if (this.member) {
      this.memberService.getUserFavAds(this.member.id).subscribe({
        next: ads => this.ads = ads
      });
    }
  }

  onAdLiked(ad: Ad) {
    this.ads = this.ads.filter(a => a.id !== ad.id);
  }
}
