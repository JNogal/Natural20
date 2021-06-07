import { Pipe, PipeTransform } from '@angular/core';
import { CharacterDto } from '../interfaces/characters.interfaces';

@Pipe({
  name: 'image',
  pure: true
})
export class ImagePipe implements PipeTransform {

  transform(character: CharacterDto): string {
    if(character.characterImg!=='') {
      return character.characterImg!;
    } else {
      console.log('no tiene imagen')
      return 'assets/no-image.png'
    } 
  }

}
