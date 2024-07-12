import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-action',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './delete-action.component.html',
  styleUrl: './delete-action.component.scss',
})
export class DeleteActionComponent {
  @Output() saveEmitter = new EventEmitter<void>();

  delete(): void {
    this.saveEmitter.emit();
  }
}
