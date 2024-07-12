import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EIcon } from '../../enums/icons/EIcon.enum';
import { EPageRoutes } from '../../enums/routes/routes.enum';

interface IMenuItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  menuExpanded = true;
  menuClass = this.menuExpanded ? 'expanded' : 'collapsed';

  constructor(private readonly _router: Router) {}

  menuItems: IMenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = this.getMenuItens();
  }

  handleNavigation(path: string) {
    this._router.navigateByUrl(path);
  }

  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
    this.menuClass = this.menuExpanded ? 'expanded' : 'collapsed';

    this.menuItems = this.getMenuItens();
  }

  private getMenuItens() {
    return [
      {
        label: this.menuExpanded ? 'Home' : '',
        icon: EIcon.HOME,
        path: EPageRoutes.HOME,
      },
    ];
  }
}
