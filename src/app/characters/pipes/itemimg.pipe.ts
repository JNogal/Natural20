import { Pipe, PipeTransform } from '@angular/core';
import { ItemDto } from '../interfaces/characters.interfaces';

@Pipe({
  name: 'itemimg'
})
export class ItemimgPipe implements PipeTransform {

  transform(item: ItemDto): string {
    if(item.itemImg!=='') {
      return item.itemImg!;
    } else {
      console.log('no tiene imagen')
      return 'assets/no-image.png' 
    }
  }

}
