import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActionBarComponent } from '../../../../shared/components/action-bar/action-bar.component';
import { SaveActionComponent } from '../../../../shared/components/action-bar/save-action/save-action.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { ToastComponent } from '../../../../shared/components/toast/toast/toast.component';
import { EMensagem } from '../../../../shared/enums/mensagens/mensagem.enum';
import { ESnackbarType } from '../../../../shared/enums/types/snackbar.enum';
import { ISnackbarData } from '../../../../shared/interfaces/snack-bar.interface';
import { ItemSelectPipe } from '../../../../shared/pipes/item-select.pipe';
import { ProdutoService } from '../../../produto.service';
import { IProdutoLoja } from '../../produto.interface';
import { IItemSelect } from './../../../../shared/interfaces/item-select.interface';

export interface IDialogData {
  idLoja: FormControl<IItemSelect | null>;
  precoVenda: FormControl<number | null>;
}

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    LayoutComponent,
    ActionBarComponent,
    SaveActionComponent,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ItemSelectPipe,
    FormsModule,
  ],
  templateUrl: './produto-cadastro-dialog.component.html',
  styleUrl: './produto-cadastro-dialog.component.scss',
})
export class DialogFormComponent implements OnInit {
  disableSelect = false;

  options?: IItemSelect[];
  produtoLoja!: IProdutoLoja | IProdutoLoja[];
  selected?: IItemSelect;

  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data: IProdutoLoja[],

    private readonly _service: ProdutoService,
    private dialogRef: MatDialogRef<DialogFormComponent>,
  ) {
    this.produtoLoja = data;

    if (!Array.isArray(data)) {
      this.selected = data;
    }
  }

  ngOnInit(): void {
    this.setFormValues();
  }

  async setFormValues(): Promise<void> {
    this._service.findAllLoja().subscribe((response) => {
      this.options = response.data;

      if (this.selected) {
        this.formGroup.get('idLoja')?.setValue(this.selected);

        if (!Array.isArray(this.produtoLoja)) {
          this.formGroup
            .get('precoVenda')
            ?.setValue(this.produtoLoja?.precoVenda);
        }
      }
    });
  }

  formGroup = new FormGroup<IDialogData>({
    idLoja: new FormControl(null, Validators.required),
    precoVenda: new FormControl(null, Validators.required),
  });

  salvar(): void {
    if (!this.formGroup.valid) {
      this.openSnackBar({
        message: EMensagem.CAMPOS_INCORRETOS,
        type: ESnackbarType.error,
      });

      return;
    }

    const precoVenda = this.formGroup.get('precoVenda')?.value ?? 0;
    const lojaSelecionada = this.formGroup.get('idLoja')?.value as IItemSelect;
    const loja = lojaSelecionada.descricao;

    this.dialogRef.close({
      idLoja: lojaSelecionada.id,
      precoVenda: precoVenda,
      loja: loja,
    });
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.idLoja;
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

  closeModal(): void {
    this.dialogRef.close();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
}
