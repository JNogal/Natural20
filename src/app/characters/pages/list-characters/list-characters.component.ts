import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharacterDto } from '../../interfaces/characters.interfaces';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styles: [
    `
      .detailContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        border-radius: 7px;
        padding-top: 10px;
        background: #4c4848
      }
    `,
  ],
})
export class ListCharactersComponent implements OnInit {
  characters: CharacterDto[] = [];

  constructor(
    private charactersService: CharactersService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params
      .pipe(
        switchMap(({ id }) => this.charactersService.getCharactersPostgres(id))
      )
      .subscribe((characters) => {
        this.characters = characters;
        console.log(characters);
      });
  }
}
