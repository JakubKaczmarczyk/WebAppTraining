import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../_models/comment';
import { CommonModule } from '@angular/common';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-ad-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-comment.component.html',
  styleUrl: './ad-comment.component.css'
})
export class AdCommentComponent implements OnInit{
  @Input() comment: Comment | undefined;
  member: Member | undefined;

  constructor (private memberService: MembersService ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.comment) return;
    console.log("jest user i jego nazwa:");
    console.log(this.comment.authorUsername);
    console.log(this.comment.text);
    this.memberService.getMember(this.comment.authorUsername).subscribe({
      next: member =>  {
        this.member = member;
      }
    })
  }
}
