export type User = {
  id: number;
  username: string;
  password: string;
  profile_picture: string;

  level: Level;
  stats: UserStats;
  bag: Bag;
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
  type: ItemRarity;
  quantity: number;
};

export type ItemRarity = "legendary" | "epic" | "rare" | "uncommon" | "common";
