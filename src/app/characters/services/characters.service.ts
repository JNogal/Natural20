import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharacterDto, ItemDto } from '../interfaces/characters.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private pgresApiEndpoint: string = environment.pgresApiEndpoint;

  constructor(private http: HttpClient) {}

  getCharactersPostgres(userId: number): Observable<CharacterDto[]> {
    return this.http.get<CharacterDto[]>(
      `${this.pgresApiEndpoint}/characters/${userId}`
    );
  }

  getCharacterByIdPostgres(charId: number): Observable<CharacterDto> {
    return this.http.get<CharacterDto>(
      `${this.pgresApiEndpoint}/characters/getOne/${charId}`
    );
  }

  getCharacterSuggestions(userId: number): Observable<CharacterDto[]> {
    return this.http.get<CharacterDto[]>(
      `${this.pgresApiEndpoint}/characters/${userId}`
    );
  }

  postCharacterPostgres(character: CharacterDto): Observable<CharacterDto> {
    return this.http.post<CharacterDto>(
      `${this.pgresApiEndpoint}/characters/createNewCharacter`,
      character
    );
  }

  updateCharacterPostgres(character: CharacterDto): Observable<CharacterDto> {
    console.log(character.characterId);
    return this.http.put<CharacterDto>(
      `${this.pgresApiEndpoint}/characters/${character.characterId}/upd`,
      character
    );
  }

  deleteCharacterPostgres(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.pgresApiEndpoint}/characters/${id}/dlt`
    );
  }
}
