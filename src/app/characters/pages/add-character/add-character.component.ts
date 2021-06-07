import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CharacterDto } from '../../interfaces/characters.interfaces';
import { CharactersService } from '../../services/characters.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
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

      .mat-divider {
        border-top-width: 2px;
        border-top-color: grey;
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

      .content {
        position: absolute;
        width: inherit;
        height: auto;
        top: 13%;
        transform: translateY(-13%);
        text-align: center;
      }

      img {
        border-radius: 5px;
        max-height: 700px;
      }

      * {
        font-size: 17px;
      }

      strong {
        margin-left: 10px;
        font-size: 35px;
      }

      .detailContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 5px solid black;
        border-radius: 7px;
        background: #4c4848;
        padding: 10px;
      }

      .detailContainerTitle {
        text-align: center;
        justify-content: center;
        align-items: center;
      }

      .margtop {
        margin-top: 15px;
      }

      .margtoptitle {
        margin-top: 10px;
      }
    `,
  ],
})
export class AddCharacterComponent implements OnInit {
  action: string = '';
  action2: string = '';
  charId!: number;
  userId!: number;
  characterAbbilities: string[] = [];

  get nameErrorMsg() {
    if (this.characterForm.get('charName')?.errors?.required) {
      return 'El nombre es obligatorio';
    } else if (this.characterForm.get('charName')?.errors?.minlength) {
      return 'El nombre debe contener al menos 2 caracteres';
    } else return;
  }

  get ageErrorMsg() {
    if (this.characterForm.get('charAge')?.errors?.required) {
      return 'La edad es obligatoria';
    } else if (this.characterForm.get('charAge')?.errors?.min) {
      return 'La edad no puede ser inferior a 0';
    } else return;
  }

  get raceErrorMsg() {
    if (this.characterForm.get('charRace')?.errors?.required) {
      return 'La raza es obligatoria';
    } else if (this.characterForm.get('charRace')?.errors?.minlength) {
      return 'La raza debe contener al menos 2 caracteres';
    } else return;
  }

  get classErrorMsg() {
    if (this.characterForm.get('charClass')?.errors?.required) {
      return 'La clase es obligatoria';
    } else if (this.characterForm.get('charClass')?.errors?.minlength) {
      return 'La clase debe contener al menos 2 caracteres';
    } else return;
  }

  characterForm: FormGroup = this.formBuilder.group({
    charName: ['', [Validators.required, Validators.minLength(2)]],
    charAge: ['', [Validators.required, Validators.min(0)]],
    charRace: ['', [Validators.required, Validators.minLength(2)]],
    charClass: ['', [Validators.required, Validators.minLength(2)]],
    charDesc: [''],
    charStr: [0, [Validators.required]],
    charDex: [0, [Validators.required]],
    charConst: [0, [Validators.required]],
    charIntel: [0, [Validators.required]],
    charChar: [0, [Validators.required]],
    charWis: [0, [Validators.required]],
    charSubclass: [''],
    charAlias: [''],
    charImg: [''],
    charAvatar: [''],
    charAbbs: ['', []],
  });

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

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editcharacter')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) =>
            this.charactersService.getCharacterByIdPostgres(id)
          )
        )
        .subscribe((character) => {
          this.charId = character.characterId!;
          this.character = character;
          this.userId = character.userId!;
          this.characterForm.reset({
            charName: character.name,
            charAge: character.age,
            charRace: character.race,
            charClass: character.class,
            charDesc: character.description,
            charStr: character.strength,
            charDex: character.dexterity,
            charConst: character.constitution,
            charIntel: character.intelligence,
            charChar: character.charisma,
            charWis: character.wisdom,
            charSubclass: character.subclass,
            charAlias: character.alias,
            charImg: character.characterImg,
            charAvatar: character.characterAvatar,
          });
        });
      this.action = 'Editar';
      this.action2 = 'Actualizar';
    } else {
      this.action = 'Nuevo';
      this.action2 = 'Crear';
    }
  }

  saveCharacter() {
    let character: CharacterDto, character2: CharacterDto;
    if (this.router.url.includes('editcharacter')) {
      this.activatedRoute.params.subscribe(({ id }) => {
        character = {
          characterId: this.character.characterId,
          name: this.characterForm.get('charName')?.value,
          class: this.characterForm.get('charAge')?.value,
          race: this.characterForm.get('charRace')?.value,
          age: this.characterForm.get('charAge')?.value,
          description: this.characterForm.get('charDesc')?.value,
          strength: this.characterForm.get('charStr')?.value,
          dexterity: this.characterForm.get('charDex')?.value,
          constitution: this.characterForm.get('charConst')?.value,
          intelligence: this.characterForm.get('charIntel')?.value,
          charisma: this.characterForm.get('charChar')?.value,
          wisdom: this.characterForm.get('charWis')?.value,
          userId: this.character.userId,
          subclass: this.characterForm.get('charSubclass')?.value,
          alias: this.characterForm.get('charAlias')?.value,
          characterAvatar: this.characterForm.get('charAvatar')?.value,
          characterImg: this.characterForm.get('charImg')?.value,
          abbilities: this.characterAbbilities,
        };
      });
      this.charactersService
        .updateCharacterPostgres(character!)
        .subscribe((character) => {
          this.showSnackBar(
            `${character.name} ha sido actualizado correctamente`
          );
        });
    } else {
      this.activatedRoute.params.subscribe(({ id }) => {
        character2 = {
          name: this.characterForm.get('charName')?.value,
          class: this.characterForm.get('charAge')?.value,
          race: this.characterForm.get('charRace')?.value,
          age: this.characterForm.get('charAge')?.value,
          description: this.characterForm.get('charDesc')?.value,
          strength: this.characterForm.get('charStr')?.value,
          dexterity: this.characterForm.get('charDex')?.value,
          constitution: this.characterForm.get('charConst')?.value,
          intelligence: this.characterForm.get('charIntel')?.value,
          charisma: this.characterForm.get('charChar')?.value,
          wisdom: this.characterForm.get('charWis')?.value,
          userId: id,
          subclass: this.characterForm.get('charSubclass')?.value,
          alias: this.characterForm.get('charAlias')?.value,
          characterAvatar: this.characterForm.get('charAvatar')?.value,
          characterImg: this.characterForm.get('charImg')?.value,
          abbilities: this.characterAbbilities,
        };
        this.charactersService
          .postCharacterPostgres(character2)
          .subscribe((character) => {
            this.activatedRoute.params.subscribe(({ id }) => {
              this.showSnackBar(
                `${character.name} ha sido creado correctamente`
              );
              console.log(id);
              this.router.navigate([
                `../../${id}/home/characters/${id}/listcharacters`,
              ]);
            });
          });
      });
    }

    console.log('saving');
    if (this.characterForm.get('charName')?.value === 0) {
      this.showSnackBar('El personaje creado debe tener un nombre');
      return;
    }
  }

  deleteCharacter() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { ...this.character },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.charactersService
          .deleteCharacterPostgres(this.character.characterId!)
          .subscribe(() => {
            this.activatedRoute.params.subscribe(({ id }) => {
              this.showSnackBar(
                `${this.character.name} ha sido borrado correctamente`
              );
              this.router.navigate([
                `../../${this.character.userId}/home/characters/${this.character.userId}/listcharacters`,
              ]);
            });
          });
      }
    });
  }

  isAddCharacter() {
    return this.router.url.includes('addcharacter');
  }

  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok!', {
      duration: 3000,
    });
  }

  fieldHasValue(field: string) {
    const value = this.characterForm.get(field)?.value;
    return value;
  }

  addAbbility() {
    if (this.characterForm.get('charAbbs')?.value == '') {
      return;
    }
    let abbility: string = this.characterForm.get('charAbbs')?.value;
    this.characterAbbilities.push(abbility);
  }

  isFieldValid(field: string) {
    return (
      this.characterForm.get(field)?.invalid &&
      this.characterForm.get(field)?.touched
    );
  }
}
