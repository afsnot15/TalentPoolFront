import { EFieldType } from '../enums/fields/field-type';

export interface ILabelValue {
  label: string;
  value: number | boolean | string | undefined;
}

export interface IFormField {
  type: EFieldType;
  class: string;
  label: string;
  formControlName: string;
  placeholder: string;
  options?: ILabelValue[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mask?: any;
}
