import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCharacterComponent } from './pages/add-character/add-character.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ListCharactersComponent } from './pages/list-characters/list-characters.component';
import { SearchCharacterComponent } from './pages/search-character/search-character.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':id/listcharacters',
        component: ListCharactersComponent,
      },
      {
        path: ':id/addcharacter',
        component: AddCharacterComponent,
      },
      {
        path: 'editcharacter/:id',
        component: AddCharacterComponent,
      },
      {
        path: ':userId/profile',
        component: UserProfileComponent,
      },
      {
        path: ':id/search',
        component: SearchCharacterComponent,
      },
      {
        path: ':userId/:id',
        component: CharacterDetailsComponent,
      },
      {
        path: ':userId/:characterId/inventory',
        component: InventoryComponent,
      },
      {
        path: ':userId/:characterId/inventory/:itemId/details',
        component: ItemDetailsComponent,
      },
      {
        path: ':userId/:characterId/inventory/:itemId/edit',
        component: AddItemComponent,
      },
      {
        path: ':userId/:characterId/inventory/additem',
        component: AddItemComponent,
      },
      {
        path: '**',
        redirectTo: 'listcharacters',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
