import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toman',
})
export class TomanPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return Number(value).toLocaleString('fa') + ' ' + "تومان";
  }

}
