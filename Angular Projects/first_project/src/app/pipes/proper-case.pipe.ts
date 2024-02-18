import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'properCase',
})
export class ProperCasePipe implements PipeTransform {
  transform(value: string): string {
    return value[0]?.toLocaleUpperCase() + value.substring(1);
  }
}
