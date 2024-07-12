import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MenuComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}
}
