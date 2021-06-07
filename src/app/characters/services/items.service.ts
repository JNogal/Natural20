import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemDto } from '../interfaces/characters.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private pgresApiEndpoint: string = environment.pgresApiEndpoint;

  constructor(private http: HttpClient) {}

  getItemsPostgres(characterId: number) {
    return this.http.get<ItemDto[]>(
      `${this.pgresApiEndpoint}/items/${characterId}`
    );
  }

  getItemByIdPostgres(itemId: number) {
    return this.http.get<ItemDto>(
      `${this.pgresApiEndpoint}/items/getOne/${itemId}`
    );
  }

  getItemsSuggestions(characterId: number) {
    return this.http.get<ItemDto[]>(
      `${this.pgresApiEndpoint}/items/${characterId}`
    );
  }

  updateItemPostgres(item: ItemDto) {
    console.log(item.itemId);
    return this.http.put<ItemDto>(
      `${this.pgresApiEndpoint}/items/${item.itemId}/upd`,
      item
    );
  }

  postItemPostgres(characterId: number, item: ItemDto) {
    return this.http.post<ItemDto>(
      `${this.pgresApiEndpoint}/items/${characterId}/createNewItem`,
      item
    );
  }

  deleteItemPostgres(itemId: number) {
    return this.http.delete<any>(`${this.pgresApiEndpoint}/items/${itemId}/dlt`);
  }
}
