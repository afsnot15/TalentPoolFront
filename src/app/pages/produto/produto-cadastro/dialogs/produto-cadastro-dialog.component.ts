import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
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
import { Subject, finalize, takeUntil } from 'rxjs';
import { ActionBarComponent } from '../../../../shared/components/action-bar/action-bar.component';
import { CloseActionComponent } from '../../../../shared/components/action-bar/close-action/close-action.component';
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

export interface IDialogFormData {
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
    CloseActionComponent,
  ],
  templateUrl: './produto-cadastro-dialog.component.html',
  styleUrl: './produto-cadastro-dialog.component.scss',
})
export class ProdutoCadastroDialogComponent implements OnInit {
  options?: IItemSelect[];
  produtoLoja!: IProdutoLoja | IProdutoLoja[];
  selected?: IItemSelect;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data: IProdutoLoja[],

    private readonly _service: ProdutoService,
    private dialogRef: MatDialogRef<ProdutoCadastroDialogComponent>,
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
    this._service
      .findAllLoja()
      .pipe(
        finalize(() => {
          this.disableLoja();
        }),
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.options = response.data;

        this.formGroup.patchValue({ idLoja: this.selected });

        if (!Array.isArray(this.produtoLoja)) {
          this.formGroup.patchValue({
            precoVenda: this.produtoLoja.precoVenda,
          });
        }
      });
  }

  formGroup = new FormGroup<IDialogFormData>({
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

    const lojaCadastrada = this.isLojaCadastrada();

    if (lojaCadastrada) {
      this.exibirMensagem();
      return;
    }

    const precoVenda = this.formGroup.get('precoVenda')?.value ?? 0;
    const lojaSelecionada = this.formGroup.get('idLoja')?.value;

    if (lojaSelecionada) {
      const loja = lojaSelecionada.descricao;

      this.dialogRef.close({
        idLoja: lojaSelecionada.id,
        precoVenda: precoVenda,
        loja: loja,
      });
    }
  }

  private disableLoja(): void {
    const control = this.formGroup.get('idLoja') as AbstractControl;

    if (Array.isArray(this.produtoLoja)) {
      control.enable();
    } else {
      this.produtoLoja.idLoja ? control.disable() : control.enable();
    }
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

  private isLojaCadastrada(): boolean {
    const lojaSelecionada = this.formGroup.get('idLoja')?.value;

    if (!lojaSelecionada) {
      return false;
    }

    let lojaCadastrada = false;

    if (Array.isArray(this.produtoLoja)) {
      this.produtoLoja.forEach((element) => {
        if (element.idLoja === lojaSelecionada.id) {
          lojaCadastrada = true;
        }
      });
    }

    return lojaCadastrada;
  }

  private exibirMensagem(): void {
    this.openSnackBar({
      message: EMensagem.LOJA_CADASTRADA,
      type: ESnackbarType.error,
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
