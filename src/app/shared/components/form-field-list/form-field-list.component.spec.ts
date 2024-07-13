import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EFieldType } from '../../enums/fields/field-type';
import { FormFieldListComponent } from './form-field-list.component';

describe('FormFieldListComponent', () => {
  let component: FormFieldListComponent;
  let fixture: ComponentFixture<FormFieldListComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(FormFieldListComponent, {
      set: {
        imports: [FormsModule, ReactiveFormsModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldListComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({ teste: new FormControl('teste') });
    component.fields = [
      {
        type: EFieldType.Input,
        class: 'text',
        label: '',
        formControlName: 'teste',
        placeholder: '',
      },
      {
        type: EFieldType.Input,
        class: 'text',
        label: 'formControlName',
        formControlName: 'teste',
        placeholder: '',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
