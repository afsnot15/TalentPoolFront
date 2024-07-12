import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { AddActionComponent } from '../../../shared/components/action-bar/add-action/add-action.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { EFieldType } from '../../../shared/enums/fields/field-type';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { intMask } from '../../../shared/masks/masks';
import { ProdutoService } from '../../produto.service';
import { IProduto, IProdutoForm } from '../produto.interface';
import { FormFieldListComponent } from './../../../shared/components/form-field-list/form-field-list.component';

const table = [MatTableModule, MatSortModule, MatPaginatorModule];

@Component({
  selector: 'app-produto-consulta',
  standalone: true,
  imports: [
    PageLayoutComponent,
    AddActionComponent,
    MatIconModule,
    FormFieldListComponent,
    table,
  ],
  templateUrl: './produto-consulta.component.html',
  styleUrl: './produto-consulta.component.scss',
})
export class ProdutoConsultaComponent extends BaseConsultaComponent<IProduto> {
  displayedColumns: string[] = ['id', 'descricao', 'custo', 'acoes'];
  fields = ['id', 'descricao', 'custo', 'acoes'];

  filterFormGroup = new FormGroup<IProdutoForm>({
    id: new FormControl(null),
    descricao: new FormControl(null),
    custo: new FormControl(null),
    precoVenda: new FormControl(null),
  });

  constructor(
    private _produtoService: ProdutoService,
    private readonly _injectorUsuario: Injector,
  ) {
    super(_produtoService, _injectorUsuario);
  }

  filterFields: IFormField[] = [
    {
      type: EFieldType.InputNumber,
      class: 'grid-2',
      label: 'Código',
      formControlName: 'id',
      placeholder: 'Ex.: 1',
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

    {
      type: EFieldType.InputNumber,
      class: 'grid-2',
      label: 'Preço Venda',
      formControlName: 'precoVenda',
      placeholder: 'Ex.: 2,99',
    },
  ];
}
