import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CharacterDto, ItemDto } from '../../interfaces/characters.interfaces';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styles: [
    `
      img {
        width: 50%;
        max-height: 500px;
        border-radius: 5px;
        margin: 20px;
      }

      mat-grid-list {
        margin-top: 20px;
      }

      .margtoptitle {
        margin-top: 10px;
      }

      mat-grid-tile-footer {
        margin-bottom: 10px;
      }

      mat-grid-tile-header,
      mat-grid-tile-footer {
        justify-content: center;
        align-items: center;
      }

      .detailContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        border-radius: 10px;
        padding: 10px;
        background: #4c4848;
      }

      .detailContainerStats {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        padding: 10px;
        height: 400px;
        border-radius: 10px;
        background: #4c4848;
      }

      button {
        margin-top: 10px;
        margin-left: 20px;
        margin-right: 20px;
      }

      .textcontainerId {
        margin-top: 10px;
        margin-bottom: 1px;
        border: 2px solid grey;
        border-radius: 10px;
        width: 70px;
        height: 30px;
        position: relative;
      }

      .margtoptitle {
        margin-top: 10px;
      }

      .content {
        position: absolute;
        width: inherit;
        height: auto;
        top: 13%;
        transform: translateY(-13%);
        text-align: center;
      }

      * {
        font-size: 20px;
      }
    `,
  ],
})
export class ItemDetailsComponent implements OnInit {
  itemId!: string;
  innerWidth: any;
  character: CharacterDto = {
    name: '',
    class: '',
    race: '',
    age: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    charisma: 0,
    wisdom: 0,
  };

  item: ItemDto = {
    name: '',
    type: '',
    description: '',
    weight: 0,
    price: 0,
    quantity: 0,
  };

  routerSubscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    private router: Router,
    private scroll: ViewportScroller
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe(
      ({ itemid }) => (this.itemId = itemid)
    );
    this.activatedRoute.params
      .pipe(
        switchMap(({ itemId }) => this.itemsService.getItemByIdPostgres(itemId))
      )
      .subscribe((item) => {
        this.item = item;

        console.log(item.description);
      });
    this.innerWidth = window.innerWidth;
  }

  backToItemsList() {
    this.router.navigate([
      '/characters',
      this.character.characterId,
      'inventory',
    ]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    this.innerWidth = event.target.innerWidth;
  }
}
