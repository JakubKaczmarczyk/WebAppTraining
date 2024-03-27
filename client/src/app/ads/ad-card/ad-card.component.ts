import { Component, Input } from '@angular/core';
import { Ad } from '../../_models/ad';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.css'
})
export class AdCardComponent {
  @Input() ad: Ad | undefined;

  constructor() {}

}
