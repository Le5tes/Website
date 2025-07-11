import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'resolveImages',
  standalone: false
})
export class ImagePipe implements PipeTransform {
  environment = environment;

  transform(value: string): string {
    return value ? value.replace(/\/image-server\//g, this.environment.blogUrl + '/images/'): null;
  }
}
