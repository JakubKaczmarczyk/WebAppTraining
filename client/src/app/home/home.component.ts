import { CommonModule } from '@angular/common';
import { Component, OnInit, Input} from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode = false;
  loggedIn = false;
  users: any;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loggedIn = false
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.loggedIn = true
        }       
      }
    })
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
