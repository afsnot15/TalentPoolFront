import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
