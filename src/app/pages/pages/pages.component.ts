import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './pages.component.html',
})
export class PagesComponent {

}
