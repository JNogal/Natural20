import { Component, Input, OnInit } from '@angular/core';
import { CharacterDto } from '../../interfaces/characters.interfaces';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }

      img {
        height: 500px;
      }

      .charname, .charage {
        margin-top: 5px;
      }

      .header-image {
        background-image: url('././assets/d20.png');
        background-size: cover;
      }
    `
  ]
})
export class CharacterCardComponent implements OnInit {

  @Input() character!: CharacterDto;

  constructor() { }

  ngOnInit(): void {
    
  }
}
