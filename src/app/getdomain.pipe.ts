import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getdomain' })
export class GetDomainPipe implements PipeTransform {
  transform(url: string): string {
    return url
      ? '(' +
          url
            .replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .split('/')[0]
            .trim() +
          ')'
      : '';
  }
}
