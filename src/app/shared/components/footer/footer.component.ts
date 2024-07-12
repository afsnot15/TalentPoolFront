import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { version } from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  today = new Date();
  year = this.today.getFullYear();
  version = version;

}
