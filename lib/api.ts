import { Client } from "./client";
import { ICard, IPaginatedResult, IParams, ISet } from "./interfaces";

const api = {
  async getAllCards(params?: IParams): Promise<IPaginatedResult<ICard>> {
    return Client.get("cards", params);
  },
  async getCardById(id: string): Promise<ICard> {
    const { data } = await Client.get("cards", id);
    return data;
  },
  async getAllSets(): Promise<ISet[]> {
    const { data } = await Client.get("sets");
    return data;
  },
  async getAllTypes(): Promise<string[]> {
    const { data } = await Client.get("types");
    return data;
  },
  async getAllSubtypes(): Promise<string[]> {
    const { data } = await Client.get("subtypes");
    return data;
  },
  async getAllSupertypes(): Promise<string[]> {
    const { data } = await Client.get("supertypes");
    return data;
  },
  async getAllRarities(): Promise<string[]> {
    const { data } = await Client.get("rarities");
    return data;
  },
};

export default api;
