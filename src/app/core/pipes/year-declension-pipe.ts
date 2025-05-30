import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearsDeclension'
})
export class YearsDeclensionPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${value} лет`;
    }

    if (lastDigit === 1) {
      return `${value} год`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${value} года`;
    }

    return `${value} лет`;
  }
}
