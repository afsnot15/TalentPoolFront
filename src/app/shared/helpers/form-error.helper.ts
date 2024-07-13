import { AbstractControl } from '@angular/forms';

const customErrors = (
  validatorValue: Record<string, number>,
): Record<string, string> => ({
  required: 'Campo obrigatório',
  max: `Deve ser menor ou igual a ${validatorValue['max']}`,
  min: `Deve ser maior ou igual a ${validatorValue['min']}`,
  minlength: `Deve ser maior ou igual a ${validatorValue['requiredLength']}`,
  maxlength: `Deve ser menor ou igual a ${validatorValue['requiredLength']}`,
  invalidfield: `Campo inválido`,
});

export function controlErrorMessages({ errors }: AbstractControl): string {
  if (!errors) return '';

  const firstError = Object.keys(errors).pop() as string;
  const cusromErrorsValues = customErrors(errors[firstError]);

  return cusromErrorsValues[firstError];
}
