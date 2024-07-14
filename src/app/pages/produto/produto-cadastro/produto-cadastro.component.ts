import { CommonModule } from '@angular/common';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { ActionBarComponent } from '../../../shared/components/action-bar/action-bar.component';
import { SaveActionComponent } from '../../../shared/components/action-bar/save-action/save-action.component';
import { FormFieldListComponent } from '../../../shared/components/form-field-list/form-field-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { EFieldType } from '../../../shared/enums/fields/field-type';
import { EMensagem } from '../../../shared/enums/mensagens/mensagem.enum';
import { ESnackbarType } from '../../../shared/enums/types/snackbar.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { intMask } from '../../../shared/masks/masks';
import { ProdutoService } from '../../produto.service';
import { IProdutoForm, IProdutoLoja } from '../produto.interface';
import { DeleteActionComponent } from './../../../shared/components/action-bar/delete-action/delete-action.component';
import { IProduto } from './../produto.interface';
import { ProdutoCadastroDialogComponent } from './dialogs/produto-cadastro-dialog.component';

export interface IProdutoLojaTable {
  loja: string;
  precoVenda: number;
  idLoja: number;
}

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
  imports: [
    PageLayoutComponent,
    ActionBarComponent,
    DeleteActionComponent,
    SaveActionComponent,
    FormFieldListComponent,
    MatTableModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss',
})
export class ProdutoCadastroComponent
  extends BaseCadastroComponent<IProduto>
  implements OnInit, OnDestroy
{
  imageSrc: string | ArrayBuffer | null = '';
  produtoLoja: IProdutoLoja[] = [];

  dataSource = new MatTableDataSource<IProdutoLojaTable>([]);

  displayedColumns: string[] = ['loja', 'precoVenda', 'acoes'];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly _produtoService: ProdutoService,
    protected override readonly _injector: Injector,
  ) {
    super(_produtoService, _injector);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cadastroFormGroup = new FormGroup<IProdutoForm>({
    id: new FormControl({ value: null, disabled: true }),
    descricao: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    custo: new FormControl(null),
    produtoLoja: new FormControl([], Validators.required),
    imagem: new FormControl(null),
  });

  cadastroFields: IFormField[] = this.getFields();

  override ngOnInit(): void {
    this.handleEdit();
    this.findProdutoLoja();

    this._produtoService
      .findImagem(this.idEdit)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response && response.data && response.data.length > 0) {
          const img = new Image();
          img.src = 'data:image/jpeg;base64,' + response.data;

          this.imageSrc = img.src;

          this.cadastroFormGroup.patchValue({ imagem: response.data });
        }
      });
  }

  protected findProdutoLoja(): void {
    this._produtoService.findProdutoLoja(this.idEdit).subscribe((response) => {
      const transformedArray = (response.data as IProdutoLoja[]).map(
        (item) => ({
          loja: item.loja.descricao,
          idProduto: item.idProduto,
          idLoja: item.idLoja,
          precoVenda: item.precoVenda,
        }),
      );

      this.dataSource.data = transformedArray;
    });
  }

  protected adicionarLoja(): void {
    const dados = this.dataSource.data.map((item) => ({
      ...item,
      idProduto: this.idEdit,
    }));

    const dialogRef = this._dialog.open(ProdutoCadastroDialogComponent, {
      disableClose: true,
      data: dados,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }

      this.dataSource.data = [...this.dataSource.data, { ...result }];

      this.updateDataSource();
    });
  }

  protected editarProdutoLoja(produtoLoja: IProdutoLojaTable): void {
    const dialogRef = this._dialog.open(ProdutoCadastroDialogComponent, {
      disableClose: true,
      data: {
        idProduto: this.idEdit,
        idLoja: produtoLoja.idLoja,
        precoVenda: produtoLoja.precoVenda,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        return;
      }
      produtoLoja.precoVenda = result.precoVenda;

      this.updateDataSource();
    });
  }

  protected removerLoja(index: number): void {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];

    this.updateDataSource();
  }

  private updateDataSource(): void {
    const transformedArray = this.dataSource.data.map((item) => ({
      idLoja: item.idLoja,
      precoVenda: item.precoVenda,
    }));

    const produtoLojaControl = this.cadastroFormGroup.get('produtoLoja');

    if (produtoLojaControl) {
      produtoLojaControl.patchValue(transformedArray as never);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onImageSelected(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files ? element.files[0] : null;
    let base64 = '';

    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.imageSrc = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          base64 = reader.result as string;
          const base64Data = base64.split(',')[1];
          this.cadastroFormGroup.patchValue({ imagem: base64Data });
        };
        reader.readAsDataURL(file);
      } else {
        this.openToast({
          message: EMensagem.FORMATO_INVALIDO,
          type: ESnackbarType.error,
        });
      }
    } else {
      this.removeImage();
    }
  }

  removeImage(): void {
    this.imageSrc = null;
    this.cadastroFormGroup.patchValue({ imagem: null });
  }

  remove() {
    this.delete(this.idEdit);
  }

  private getFields(): IFormField[] {
    return [
      {
        type: EFieldType.InputNumber,
        class: 'grid-2',
        label: 'Código',
        formControlName: 'id',
        placeholder: '',
        mask: intMask,
      },
      {
        type: EFieldType.Input,
        class: 'grid-4',
        label: 'Descrição',
        formControlName: 'descricao',
        placeholder: 'Ex.: Produto 1',
      },
      {
        type: EFieldType.InputNumber,
        class: 'grid-2',
        label: 'Custo',
        formControlName: 'custo',
        placeholder: 'Ex.: 2,99',
      },
    ];
  }
}
