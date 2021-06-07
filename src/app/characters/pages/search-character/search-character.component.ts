import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CharacterDto } from '../../interfaces/characters.interfaces';
import { CharactersService } from '../../services/characters.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-character',
  templateUrl: './search-character.component.html',
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

      .detailContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        border-radius: 7px;
        padding-top: 10px;
      }

      .centered {
        text-align: center;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class SearchCharacterComponent implements OnInit {
  term: string = '';
  userId!: number;
  searchInput = new FormControl('');
  characters: CharacterDto[] = [];
  selectedCharacter: CharacterDto | undefined;
  suggestions: CharacterDto[] = [];

  constructor(
    private charactersService: CharactersService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe(({ id }) => (this.userId = id));
  }

  search() {
    this.term = this.searchInput.value;
    this.charactersService
      .getCharacterSuggestions(this.userId)
      .subscribe((characters) => (this.characters = characters));
    let suggestions: CharacterDto[] = [];
    this.characters.forEach((character) => {
      if (character.name.toLowerCase().includes(this.term.toLowerCase())) {
        suggestions.push(character);
      }
    });
    this.suggestions = suggestions;
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedCharacter = undefined;
      return;
    }

    const character: CharacterDto = event.option.value;
    this.term = character.name;

    this.charactersService
      .getCharacterByIdPostgres(character.characterId!)
      .subscribe((character) => {
        console.log(character.characterId);
        this.selectedCharacter = character;
      });
  }

  checkValue(value: any) {
    return value.name;
  }
}
