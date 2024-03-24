import { Component, OnInit } from '@angular/core';
import { Ad } from '../../_models/ad';
import { AdsService } from '../../_services/ads.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AdCardComponent } from '../ad-card/ad-card.component';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [CommonModule, AdCardComponent],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent implements OnInit {
  ads$: Observable<Ad[]> | undefined;

  constructor(private adsService: AdsService) { }

  ngOnInit(): void {
    this.ads$ = this.adsService.getAds();
  }
}
