export type User = {
  id: number;
  username: string;
  password: string;
  profile_picture: string;

  bag: Bag;
  friends: Friend[];
};

export type Friend = {
  id: number;
  friend_id: number;
  hitpoints: number;
  level: number;
  bag: Bag;
};

export type Bag = {
  id: number;
  user_id: number;
  items: BagItem[];
  capacity: number;
};

export type BagItem = {
  id: number;
  name: string;
  type: "legendary" | "rare" | "common";
  quantity: number;
};
