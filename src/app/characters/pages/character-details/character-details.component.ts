import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { CharacterDto } from '../../interfaces/characters.interfaces';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styles: [
    `
      img {
        width: 70%;
        border-radius: 5px;
        margin: 15px;
      }

      mat-grid-list {
        margin-top: 20px;
      }

      mat-grid-tile-footer {
        margin-bottom: 10px;
      }

      mat-grid-tile-header,
      mat-grid-tile-footer {
        justify-content: center;
        align-items: center;
      }

      * {
        font-size: 20px;
      }

      mat-label {
        margin: 5px;
      }

      .detailContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        padding: 10px;
        border-radius: 5px;
      }

      .detailContainerInfo {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        padding: 10px;
        height: 700px;
        border-radius: 5px;
      }

      .detailContainerStats {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        padding: 10px;
        height: 600px;
        border-radius: 5px;
      }

      button {
        margin-top: 10px;
        margin-right: 50px;
        margin-left: 50px;
      }
    `,
  ],
})
export class CharacterDetailsComponent implements OnInit {
  innerWidth: any;
  character!: CharacterDto;
  routerSubscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    private router: Router,
    private scroll: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.charactersService.getCharacterByIdPostgres(id)
        )
      )
      .subscribe((character) => {
        console.log(character);
        this.character = character;
      });
    this.innerWidth = window.innerWidth;
    console.log(this.character);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    this.innerWidth = event.target.innerWidth;
  }
}
