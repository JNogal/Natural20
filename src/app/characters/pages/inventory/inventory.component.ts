import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CharacterDto, ItemDto } from '../../interfaces/characters.interfaces';
import { CharactersService } from '../../services/characters.service';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: [
    `
      app-item-card {
        margin: 1px;
      }

      .detailContainer {
        background: #4c4848;
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        border-radius: 7px;
        padding-top: 10px;
      }      
    `,
  ],
})
export class InventoryComponent implements OnInit {
  character: CharacterDto = {
    name: '',
    class: '',
    race: '',
    age: 0,
    description: '',
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    charisma: 0,
    wisdom: 0,
    inventory: [],
    userId: 0,
    subclass: '',
    alias: '',
    characterImg: '',
  };
  items: ItemDto[] | undefined = [];

  constructor(
    private charactersService: CharactersService,
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ characterId }) =>
          this.charactersService.getCharacterByIdPostgres(characterId)
        )
      )
      .subscribe((character) => {
        this.character = character;
        this.itemsService
          .getItemsPostgres(character.characterId!)
          .subscribe((items) => (this.items = items));
      });
  }
}
