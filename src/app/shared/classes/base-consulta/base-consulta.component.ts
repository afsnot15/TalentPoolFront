import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EActionRoutes } from '../../enums/routes/routes.enum';
import { getPaginatorIntl } from '../../helpers/paginator-intl.helper';
import { IFormField } from '../../interfaces/form-field.interface';
import { BaseResourceService } from '../base-resource/base-resource.service';

@Component({
  template: '',
})
export abstract class BaseConsultaComponent<TData>
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginatorEl!: MatPaginator;

  private readonly _router!: Router;
  private readonly _route!: ActivatedRoute;

  abstract displayedColumns: string[];
  abstract filterFormGroup: FormGroup;
  abstract filterFields: IFormField[];

  dataSource = new MatTableDataSource<TData>([]);
  sort: Sort = { active: 'id', direction: 'asc' };
  page: PageEvent = { pageIndex: 0, pageSize: 5, length: 0 };

  loading = false;

  constructor(
    private readonly _service: BaseResourceService<TData>,
    protected _injector: Injector,
  ) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
  }

  get filter() {
    return this.filterFormGroup.getRawValue();
  }

  ngOnInit() {
    this.search();
  }

  ngAfterViewInit(): void {
    this.paginatorEl._intl = getPaginatorIntl(this.paginatorEl._intl);
  }

  search() {
    this.loading = true;

    this._service
      .findAll(this.page, this.sort, this.filter)
      .subscribe((response) => {
        this.dataSource.data = response.data;
        this.paginatorEl.length = response.count as number;
        this.loading = false;
      });
  }

  applySort(sort: Sort) {
    this.sort = sort;
    this.search();
  }

  applyPage(page: PageEvent) {
    this.page = page;
    this.search();
  }

  editar(id: number): void {
    this._router.navigate([`/produto/${EActionRoutes.EDITAR}/${id}`], {
      relativeTo: this._route,
    });
  }

  excluir(id: number): void {
    this._service.delete(id).subscribe(() => {
      this.search();
    });
  }
}
