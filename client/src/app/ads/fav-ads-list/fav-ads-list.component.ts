import { Component, OnInit } from '@angular/core';
import { Ad } from '../../_models/ad';
import { AdsService } from '../../_services/ads.service';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { AdCardComponent } from '../ad-card/ad-card.component';

@Component({
  selector: 'fav-app-ads-list',
  standalone: true,
  imports: [CommonModule, AdCardComponent, RouterModule],
  templateUrl: './fav-ads-list.component.html',
  styleUrl: './fav-ads-list.component.css'
})
export class FavAdsListComponent implements OnInit {
  ads$: Observable<Ad[]> | undefined;
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
      this.ads$ = this.memberService.getUserFavAds(this.member.id);
    }
  }
}





