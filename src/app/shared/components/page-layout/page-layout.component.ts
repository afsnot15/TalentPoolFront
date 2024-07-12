import { Component } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [ActionBarComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
})
export class PageLayoutComponent {}
