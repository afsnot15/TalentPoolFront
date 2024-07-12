import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { EPageRoutes } from '../../shared/enums/routes/routes.enum';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private readonly _router: Router) {}

  goToHome() {
    this._router.navigateByUrl(EPageRoutes.ROOT);
  }
}
