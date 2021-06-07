import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { AddCharacterComponent } from './pages/add-character/add-character.component';
import { SearchCharacterComponent } from './pages/search-character/search-character.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ListCharactersComponent } from './pages/list-characters/list-characters.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { ImagePipe } from './pipes/image.pipe';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemimgPipe } from './pipes/itemimg.pipe';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { ConfirmDialogCreateComponent } from './components/confirm-dialog-create/confirm-dialog-create.component';
import { ConfirmDialogItemComponent } from './components/confirm-dialog-item/confirm-dialog-item.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AvatarPipe } from './pipes/avatar.pipe';

@NgModule({
  declarations: [
    AddCharacterComponent,
    SearchCharacterComponent,
    CharacterDetailsComponent,
    HomeComponent,
    ListCharactersComponent,
    CharacterCardComponent,
    ImagePipe,
    InventoryComponent,
    ConfirmDialogComponent,
    ItemCardComponent,
    ItemimgPipe,
    SearchItemComponent,
    ItemDetailsComponent,
    AddItemComponent,
    ConfirmDialogCreateComponent,
    ConfirmDialogItemComponent,
    UserProfileComponent,
    AvatarPipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CharactersRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CharacterCardComponent
  ]
})
export class CharactersModule { }
