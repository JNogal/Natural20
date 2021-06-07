export interface CharacterDto {
    characterId?: number;
    name: string;
    class: string;
    race: string;
    age: number;
    description?: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    charisma: number;
    wisdom: number;
    inventory?: ItemDto[] | undefined;
    userId?: number;
    subclass?: string;
    alias?: string;
    abbilities?: string[];
    characterImg?: string;
    characterAvatar?: string;
}

export interface ItemDto {
  name: string;
  type: string;
  description: string;
  itemId?: number;
  weight?: number;
  totalWeight?: number;
  price?: number;
  quantity?: number;
  durability?: number;
  uses?: number;
  itemImg?: string;

  characterId?: number;

  createdAt?: string;
  updatedAt?: string;
}