import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-save-action',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './save-action.component.html',
  styleUrl: './save-action.component.scss',
})
export class SaveActionComponent {
  @Output() saveEmitter = new EventEmitter<void>();

  save(): void {
    this.saveEmitter.emit();
  }
}
