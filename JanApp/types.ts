export type User = {
  id: number;
  username: string;
  password: string;
  profile_picture: string;
  character: File;

  level: Level;
  stats: UserStats;
  bag: Bag;
  equipped_items: EquippedItem[];
  friends: Friend[];
};

export type UserStats = {
  id: number;
  hitpoints: number;
  physical_attack: number;
  magical_attack: number;
  defense: number;
  agility: number;
  luck: number;
};

export type Level = {
  id: number;
  level: number;
  experience: number;
};

export type Friend = {
  id: number;
  friend_id: number;
  character: File;
  username: string;
  nickname: string;

  level: Level;
  stats: UserStats;
  bag: Bag;
};

export type Bag = {
  id: number;
  user_id: number;
  capacity: number;
  items: BagItem[];
};

export type BagItem = {
  id: number;
  name: string;
  rarity: ItemRarity;
  quantity: number;
};

export type EquippedItem = {
  id: number;
  name: string;
  statBoosts?: {
    physical_attack?: number;
    magical_attack?: number;
    defense?: number;
    agility?: number;
    luck?: number;
  };
  rarity: ItemRarity;
};

export type ItemRarity = "legendary" | "epic" | "rare" | "uncommon" | "common";
