import { Component, Input } from '@angular/core';
import { Comment } from '../../_models/comment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-comment.component.html',
  styleUrl: './ad-comment.component.css'
})
export class AdCommentComponent {
  @Input() comment: Comment | undefined;

}
