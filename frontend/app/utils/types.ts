export interface User {
  username: string;
  password: string;
}

export interface UserExtended extends User {
  _id: string;
  stats: Stats;
  profile_picture: string;
}

export interface Stats {
  luck: number;
  strength: number;
}

export interface ItemDex {
  userId: string;
  itemId: string;
  timesFished: number;
  discovered: boolean;
  discoveredAt: Date | null;
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  type: string;
  rarity: string;
  buffs: Buff[];
}

export interface Buff {
  stat: string;
  value: number;
}
