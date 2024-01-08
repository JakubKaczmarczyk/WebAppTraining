import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  @Output() calcelRegister = new EventEmitter();
  model: any = {}

  constructor(private acconutService: AccountService, private toaster: ToastrService) { }

  register() {
    this.acconutService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => {
        this.toaster.error(error.error)
      }
    })
  }

  cancel() {
    this.calcelRegister.emit(false);
  }
}
