import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  @Input() usersFromHomeComponent: any;
  @Output() calcelRegister = new EventEmitter();
  model: any = {}

  register() {
    console.log(this.model);
  }

  cancel() {
    this.calcelRegister.emit(false);
  }
}
