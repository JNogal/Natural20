import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CharacterDto, ItemDto } from '../../interfaces/characters.interfaces';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styles: [
    `
      .autocomplete-form {
        min-width: 500px;
        max-width: 500px;
        width: 100%;
      }

      .enable-full-width {
        width: 500px;
      }

      .middler {
        padding: 60px;
      }

      .imgbox {
        max-width: 400px;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class SearchItemComponent implements OnInit {
  @Input() character!: CharacterDto;
  term: string = '';
  searchInput = new FormControl('');
  loadedItems: ItemDto[] = [];
  items: ItemDto[] = [];
  selectedItem: ItemDto | undefined;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {}

  search() {
    this.term = this.searchInput.value;
    let loadedItems: ItemDto[] = [];
    let itemsSuggestions: ItemDto[] = [];
    this.itemsService
      .getItemsSuggestions(this.character.characterId!)
      .subscribe((items) => {
        console.log(items);
        items.forEach((item) => {
          if (item.name.toLowerCase().includes(this.term.toLowerCase())) {
            itemsSuggestions.push(item);
            this.items = itemsSuggestions;
          }
        });
      });
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    // if (event.option.value !== '404') {
    //   this.selectedHero = event.option.value;
    // }
    // this.term = this.selectedHero!.superhero;
    if (!event.option.value) {
      this.selectedItem = undefined;
      return;
    }

    this.selectedItem = event.option.value;
  }

  checkValue(value: any) {
    return value.name;
  }
}
