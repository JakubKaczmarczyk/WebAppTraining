import { Component, OnInit } from '@angular/core';
import { Ad } from '../../_models/ad';
import { AdsService } from '../../_services/ads.service';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { MyAdCardComponent } from '../my-ad-card/my-ad-card.component';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'my-app-ads-list',
  standalone: true,
  imports: [CommonModule, MyAdCardComponent, RouterModule],
  templateUrl: './my-ads-list.component.html',
  styleUrl: './my-ads-list.component.css'
})
export class MyAdsListComponent implements OnInit {
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
    if (this.member) {
      this.ads$ = this.memberService.getUserAds(this.member.id);
    }
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }
}





