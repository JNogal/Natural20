import { Pipe, PipeTransform } from '@angular/core';
import { CharacterDto } from '../interfaces/characters.interfaces';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(character: CharacterDto): string {
    return character.characterAvatar!
  }

}
