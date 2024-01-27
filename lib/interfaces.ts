import { Type } from "./types";

export interface IParams {
  q?: Query;
  page?: number | string;
  pageSize?: number | string;
}

export interface Query {
  [key: string]: string;
}

export interface IPaginatedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface ICard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level: string;
  hp: string;
  types?: Type[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: IAncientTrait;
  abilities?: IAbility[];
  attacks?: IAttack[];
  weaknesses?: IEffectiveness[];
  resistances?: IEffectiveness[];
  retreatCost?: Type[];
  set: ISet;
  number: number;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: ILegalities;
  regulationMark: string;
  images: {
    small: string;
    large: string;
  };
}

export interface ISet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: ILegalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

export interface IAttack {
  cost: Type[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface IAbility {
  name: string;
  text: string;
  type: string;
}

export interface IAncientTrait {
  name: string;
  text: string;
}

export interface IEffectiveness {
  type: Type;
  value: string;
}

export interface ILegalities {
  standard?: string;
  expanded?: string;
  unlimited?: string;
}
