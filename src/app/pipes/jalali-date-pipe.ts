import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import 'dayjs/locale/fa';

dayjs.extend(jalaliday);
dayjs.locale('fa');

@Pipe({
  name: 'jalaliDate',
  standalone: true
})
export class JalaliDatePipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    format: 'DD/MMMM/YYYY HH:mm:ss'| 'DD/MMMM/YYYY'= 'DD/MMMM/YYYY'
  ): string {
    if (!value) return '';
    return dayjs(value).calendar('jalali').format(format);
  }
}
