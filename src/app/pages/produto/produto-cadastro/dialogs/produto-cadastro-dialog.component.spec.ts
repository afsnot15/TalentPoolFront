import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActionBarComponent } from '../../../../shared/components/action-bar/action-bar.component';
import { SaveActionComponent } from '../../../../shared/components/action-bar/save-action/save-action.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { ItemSelectPipe } from '../../../../shared/pipes/item-select.pipe';
import { ProdutoService } from '../../../produto.service';
import {
  IDialogFormData,
  ProdutoCadastroDialogComponent,
} from './produto-cadastro-dialog.component';

describe('DialogFormComponent', () => {
  let component: ProdutoCadastroDialogComponent;
  let fixture: ComponentFixture<ProdutoCadastroDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<
    MatDialogRef<ProdutoCadastroDialogComponent>
  >;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockProdutoService: jasmine.SpyObj<ProdutoService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    mockProdutoService = jasmine.createSpyObj('ProdutoService', [
      'findAllLoja',
    ]);

    await TestBed.overrideComponent(ProdutoCadastroDialogComponent, {
      set: {
        imports: [
          MatDialogModule,
          MatSnackBarModule,
          ReactiveFormsModule,
          FormsModule,
          HttpClientTestingModule,
          ActionBarComponent,
          SaveActionComponent,
          LayoutComponent,
          ItemSelectPipe,
          MatInputModule,
          MatSelectModule,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: { idLoja: 1, precoVenda: 10 },
          },
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MatSnackBar, useValue: mockSnackBar },
          { provide: ProdutoService, useValue: mockProdutoService },
        ],
      },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCadastroDialogComponent);
    component = fixture.componentInstance;

    component.formGroup = new FormGroup<IDialogFormData>({
      idLoja: new FormControl(),
      precoVenda: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
