import { Component, Input } from '@angular/core';
import { Ad } from '../../_models/ad';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { User } from '../../_models/user';
import { Member } from '../../_models/member';
import { AdsService } from '../../_services/ads.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.css'
})
export class AdCardComponent {
  @Input() ad: Ad | undefined;
  member: Member | null = null;
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
