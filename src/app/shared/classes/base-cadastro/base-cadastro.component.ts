import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ToastComponent } from '../../components/toast/toast/toast.component';
import { EPathRoutes } from '../../enums/routes/routes.enum';
import { ESnackbarType } from '../../enums/types/snackbar.enum';
import {
  CanDeactivateComponent,
  TCanDeactivate,
} from '../../guards/pending-changes.guard';
import { IResponse } from '../../interfaces/find-all-response.interface';
import { IFormField } from '../../interfaces/form-field.interface';
import { ISnackbarData } from '../../interfaces/snack-bar.interface';
import { BaseResourceService } from '../base-resource/base-resource.service';

@Component({
  template: '',
})
export abstract class BaseCadastroComponent<TData extends { id: number }>
  implements OnInit, CanDeactivateComponent
{
  private readonly _router!: Router;
  private readonly _route!: ActivatedRoute;
  protected readonly _dialog!: MatDialog;
  private readonly _snackBar!: MatSnackBar;

  abstract cadastroFormGroup: FormGroup;
  abstract cadastroFields: IFormField[];

  idEdit!: number;
  payload!: TData;

  constructor(
    private readonly _service: BaseResourceService<TData>,
    protected _injector: Injector,
  ) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
    this._dialog = this._injector.get(MatDialog);
    this._snackBar = this._injector.get(MatSnackBar);
  }

  ngOnInit(): void {
    this.handleEdit();
  }

  protected handleEdit(): void {
    const id = this._route.snapshot.params['id'];

    if (!id) {
      return;
    }

    this.idEdit = +id;

    this.findOne().subscribe((response) => {
      if (!response) {
        this.navigateToCadastro();
        return;
      }

      this.payload = response.data;
      this.patchFormForEdit(response.data);
    });
  }

  protected findOne(): Observable<IResponse<TData>> {
    return this._service.findOneById(this.idEdit);
  }

  protected navigateToCadastro(): void {
    this._router.navigate([`../../${EPathRoutes.CADASTRO}`], {
      relativeTo: this._route,
    });
  }

  protected buildEditValues(payload: TData): TData {
    return payload;
  }

  protected patchFormForEdit(payload: TData): void {
    const values = this.buildEditValues(payload);

    this.cadastroFormGroup.patchValue(values);
  }

  save(addNew = false) {
    this.cadastroFormGroup.markAllAsTouched();

    if (this.cadastroFormGroup.invalid) {
      return;
    }

    this.idEdit ? this.editar(addNew) : this.adicionar(addNew);
  }

  protected editar(addNew = false): void {
    this._service
      .updateById(this.idEdit, this.formValues)
      .subscribe((response) => {
        this.openSnackBar({
          message: response.message,
          type: ESnackbarType.success,
        });

        if (addNew) {
          this.cadastroFormGroup.markAsUntouched();
          this.navigateToCadastro();
        } else {
          this.actionsAfterUpdate();
        }
      });
  }

  protected adicionar(addNew = false): void {
    this._service.create(this.formValues).subscribe((response) => {
      const id = response.data.id;
      if (addNew) {
        this.cadastroFormGroup.reset();
      } else {
        this.cadastroFormGroup.markAsUntouched();
        this._router.navigate([`../editar/${id}`], { relativeTo: this._route });
      }
    });
  }

  protected actionsAfterUpdate(): void {
    this.cadastroFormGroup.markAsUntouched();
  }

  get formValues() {
    return this.cadastroFormGroup.getRawValue() as unknown as TData;
  }

  canDeactivate(): TCanDeactivate {
    if (!this.cadastroFormGroup.touched) return true;

    const ref = this._dialog.open(DialogComponent, {
      disableClose: true,
      data: {
        titleText: 'Ações Pendentes',
        contentText: 'Você deseja confirmar essa ação?',
      },
    });

    return ref.afterClosed() as unknown as Observable<boolean>;
  }

  delete(id: number): void {
    this._service.delete(id).subscribe(() => {
      this._router.navigate([`../consulta/`], { relativeTo: this._route });
    });
  }

  protected openSnackBar(data: ISnackbarData, duration = 50000) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this._snackBar.openFromComponent<ToastComponent, ISnackbarData>(
      ToastComponent,
      {
        duration,
        data,
        panelClass: data.type,
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
      },
    );
  }
}
