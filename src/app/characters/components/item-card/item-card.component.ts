import { Component, Input, OnInit } from '@angular/core';
import { CharacterDto, ItemDto } from '../../interfaces/characters.interfaces';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styles: [
    `
      img {
        height: 350px;
      }

      .header-image {
        background-image: url('././assets/d20.png');
        background-size: cover;
      }

      .circle {
        background-color: #ebba34;
        height: 35px;
        width: 35px;
        border-radius: 50%;
        position: relative;
        border: 2px solid black;
      }

      .content {
        position: absolute;
        width: inherit;
        height: auto;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        color: black;
      }

      .card {
        display: grid;
        grid-template-columns: 300px;
        grid-template-rows: 210px 210px 210px;
        grid-template-areas: "image" "text" "stats";

        font-family: roboto;
        border-radius: 18px;
        background: white;
        box-shadow: 5px 5px 15px rgba(0,0,0,0.9);
        text-align: center;
      }

      .card-image {
        grid-area: image;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background-size: cover;
      }
      
      .card-text {
        grid-area: text;
        margin: 25px;
        color: black;
        font-size: 13px;
      }

      .card-stats {
        grid-area: stats;
      }
    `
  ]
})
export class ItemCardComponent implements OnInit {

  @Input() character!: CharacterDto;
  @Input() item!: ItemDto;

  constructor() { }

  ngOnInit(): void {
  }

}
