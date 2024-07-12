import { Pipe, PipeTransform } from '@angular/core';
import { IItemSelect } from '../interfaces/item-select.interface';

@Pipe({
  name: 'itemSelect',
  standalone: true,
})
export class ItemSelectPipe implements PipeTransform {
  transform(itemSelect: IItemSelect): string {
    return `${itemSelect.id} - ${itemSelect.descricao}`;
  }
}
