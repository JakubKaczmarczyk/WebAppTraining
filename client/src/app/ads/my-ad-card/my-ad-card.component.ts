import { Component, Input } from '@angular/core';
import { Ad } from '../../_models/ad';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'my-app-ad-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-ad-card.component.html',
  styleUrl: './my-ad-card.component.css'
})
export class MyAdCardComponent {
  @Input() ad: Ad | undefined;

  constructor() {}

}
