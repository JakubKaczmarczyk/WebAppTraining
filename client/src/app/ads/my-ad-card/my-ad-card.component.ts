import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ad } from '../../_models/ad';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdsService } from '../../_services/ads.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'my-app-ad-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-ad-card.component.html',
  styleUrl: './my-ad-card.component.css'
})
export class MyAdCardComponent {
  @Input() ad: Ad | undefined;
  @Output() adLiked = new EventEmitter<Ad>();

  constructor(
    private adsService: AdsService,
    private toastr: ToastrService
  ) {}

  deleteAd(){
    console.log("lets delete Ad!");
    if (!this.ad) return;
    console.log("there is ad to delete!");
    this.adsService.deleteAd(this.ad).subscribe({
      next: _ => {
        this.toastr.success('Advert deleted succesfully');
        this.adLiked.emit(this.ad);
      }
    })
    
  }
}
