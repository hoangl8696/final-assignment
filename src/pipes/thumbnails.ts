import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'thumbnails'
})
@Injectable()
export class Thumbnails {

  transform(filename, size) {
    switch (size) {
      case 'small':
        return filename.substring(0, filename.indexOf('.')) + '-tn160.png';
      case 'medium':
        return filename.substring(0, filename.indexOf('.')) + '-tn320.png';
      case 'large':
        return filename.substring(0, filename.indexOf('.')) + '-tn640.png';
      default:
        return filename;
    }
  }
}
