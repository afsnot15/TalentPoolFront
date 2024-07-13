import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-close-action',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './close-action.component.html',
  styleUrl: './close-action.component.scss',
})
export class CloseActionComponent {
  @Output() closeEmitter = new EventEmitter<void>();

  close(): void {
    this.closeEmitter.emit();
  }
}
