import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmDialogItemComponent } from '../../components/confirm-dialog-item/confirm-dialog-item.component';
import { ItemDto } from '../../interfaces/characters.interfaces';
import { CharactersService } from '../../services/characters.service';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styles: [
    `
      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type='number'] {
        -moz-appearance: textfield;
      }

      img {
        width: 600px;
        height: 600px;
      }

      .detailContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        border-radius: 7px;
        padding: 10px;
      }

      .detailContainerTitle {
        text-align: center;
        justify-content: center;
        align-items: center;
      }

      input {
        margin-right: 50px;
      }

      .input-container {
        margin-bottom: 30px;
      }

      .textcontainer {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 2px solid grey;
        border-radius: 10px;
        width: 200px;
        height: 30px;
        position: relative;
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

      strong {
        margin-left: 10px;
        font-size: 35px;
      }
    `,
  ],
})
// implements OnInit
export class AddItemComponent {
  action: string = '';
  action2: string = '';

  get nameErrorMsg() {
    if (this.itemForm.get('itemName')?.errors?.required) {
      return 'El nombre es obligatorio';
    } else if (this.itemForm.get('itemName')?.errors?.minlength) {
      return 'El nombre debe contener al menos 3 caracteres';
    } else return;
  }

  get descErrorMsg() {
    if (this.itemForm.get('itemDesc')?.errors?.required) {
      return 'La descripción es obligatoria';
    } else if (this.itemForm.get('itemDesc')?.errors?.minlength) {
      return 'La descripción es demasiado corta (min. 20 caracteres)';
    } else return;
  }

  get weightErrorMsg() {
    if (this.itemForm.get('itemWeight')?.errors?.required) {
      return 'El peso es obligatorio';
    } else if (this.itemForm.get('itemWeight')?.errors?.min) {
      return 'El peso no puede ser menor a 0';
    } else return;
  }

  get priceErrorMsg() {
    if (this.itemForm.get('itemPrice')?.errors?.required) {
      return 'El precio es obligatorio';
    } else if (this.itemForm.get('itemPrice')?.errors?.min) {
      return 'El precio no puede ser menor a 0';
    } else return;
  }

  itemForm: FormGroup = this.formBuilder.group({
    itemName: ['', [Validators.required, Validators.minLength(3)]],
    itemType: ['Arma', [Validators.required]],
    itemDesc: ['', [Validators.required, Validators.minLength(20)]],
    itemWeight: [0, [Validators.required, Validators.min(0)]],
    itemPrice: [0, [Validators.required, Validators.min(0)]],
    itemQtty: [0, [Validators.min(0)]],
    itemDur: [0, [Validators.min(0)]],
    itemUses: [0, [Validators.min(0)]],
    itemImg: [''],
  });

  item: ItemDto = {
    name: '',
    type: '',
    description: '',
    weight: 0,
    price: 0,
    quantity: 0,
    itemImg: '',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ itemId }) =>
            this.itemsService.getItemByIdPostgres(itemId)
          )
        )
        .subscribe((item) => {
          this.item = item;
          this.itemForm.reset({
            itemName: item.name,
            itemType: item.type,
            itemDesc: item.description,
            itemPrice: item.price,
            itemWeight: item.weight,
            itemQtyy: item.quantity,
            itemDur: item.durability,
            itemUses: item.uses,
            itemImg: item.itemImg,
          });
        });
      this.action = 'Editar';
      this.action2 = 'Actualizar';
    } else {
      this.action = 'Nuevo';
      this.action2 = 'Crear';
    }
  }

  saveItem() {
    let item: ItemDto, item2: ItemDto;
    if (this.router.url.includes('edit')) {
      console.log('editando');
      let id: number = 0;
      this.activatedRoute.params.subscribe(({ characterId }) => {
        this.activatedRoute.params.subscribe(({ itemId }) => {
          id = Number(itemId);
        });
        console.log(id);
        item = {
          itemId: id,
          characterId: Number(characterId),
          name: this.itemForm.get('itemName')?.value,
          type: this.itemForm.get('itemType')?.value,
          description: this.itemForm.get('itemDesc')?.value,
          price: this.itemForm.get('itemPrice')?.value,
          weight: this.itemForm.get('itemWeight')?.value,
          quantity: this.itemForm.get('itemQtyy')?.value,
          durability: this.itemForm.get('itemDur')?.value,
          uses: this.itemForm.get('itemUses')?.value,
          itemImg: this.itemForm.get('itemImg')?.value,
        };
        this.item = item;
        console.log(this.item);
        this.itemsService.updateItemPostgres(this.item).subscribe((item) => {
          console.log(item);
          this.showSnackBar(`${item.name} ha sido actualizado correctamente`);
        });
      });
    } else {
      console.log('creando');
      this.activatedRoute.params.subscribe(({ characterId }) => {
        item2 = {
          characterId: Number(characterId),
          name: this.itemForm.get('itemName')?.value,
          type: this.itemForm.get('itemType')?.value,
          description: this.itemForm.get('itemDesc')?.value,
          price: this.itemForm.get('itemPrice')?.value,
          weight: this.itemForm.get('itemWeight')?.value,
          quantity: this.itemForm.get('itemQtyy')?.value,
          durability: this.itemForm.get('itemDur')?.value,
          uses: this.itemForm.get('itemUses')?.value,
          itemImg: this.itemForm.get('itemImg')?.value,
        };
        this.item = item2;
        console.log(this.item);
        this.itemsService
          .postItemPostgres(characterId, this.item)
          .subscribe((item) => {
            this.activatedRoute.params.subscribe(({ userId, characterId }) => {
              this.showSnackBar(`${item.name} ha sido creado correctamente`);
              // this.router.navigate(['..', String(userId), 'home/characters/1', String(characterId), 'inventory']);
              this.router.navigate([
                `../../${userId}/home/characters/${userId}1/${characterId}/inventory`,
              ]);
            });
          });
      });
    }

    console.log('saving');
    if (this.itemForm.get('itemName')?.value === 0) {
      this.showSnackBar('El personaje creado debe tener un nombre');
      return;
    }
  }

  deleteItem() {
    const dialog = this.dialog.open(ConfirmDialogItemComponent, {
      width: '350px',
      data: { ...this.item },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.itemsService
          .deleteItemPostgres(this.item.itemId!)
          .subscribe(() => {
            this.activatedRoute.params.subscribe(({ userId, characterId }) => {
              console.log(userId, characterId);
              this.showSnackBar(
                `${this.item.name} ha sido borrado correctamente`
              );
              this.router.navigate([
                `../../${userId}/home/characters/${userId}1/${characterId}/inventory`,
              ]);
            });
          });
      }
    });
  }

  isAddItem() {
    return this.router.url.includes('additem');
  }

  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok!', {
      duration: 3000,
    });
  }

  isFieldValid(field: string) {
    return (
      this.itemForm.get(field)?.invalid && this.itemForm.get(field)?.touched
    );
  }
}
