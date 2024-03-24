import { Component, Input } from '@angular/core';
import { Ad } from '../../_models/ad';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.css'
})
export class AdCardComponent {
  @Input() ad: Ad | undefined;

  constructor() {}

}
