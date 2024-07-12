import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export type TCanDeactivate = Observable<boolean> | Promise<boolean> | boolean;

export interface CanDeactivateComponent {
  canDeactivate: () => TCanDeactivate;
}

export const pendingChangesGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component,
): TCanDeactivate => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
