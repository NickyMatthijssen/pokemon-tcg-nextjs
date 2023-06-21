import { IParams, Query } from "./interfaces";

export class Client {
  static url: string = "https://api.pokemontcg.io";
  static version: number = 2;

  static async get(resource: string, params?: IParams | string) {
    let url = `${this.url}/v${this.version}/${resource}`;

    if (typeof params === "string") {
      url += `/${params}`;
    } else if (params !== undefined) {
      url += `?${this.createQuery(params)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  static createQuery(params: IParams) {
    let query: string = "";

    for (const key in params) {
      const value = params[key as keyof IParams];

      if (value === undefined) continue;

      let formattedValue: string;
      if (typeof value === "string" || typeof value === "number") {
        formattedValue = value.toString();
      } else {
        formattedValue = this.createQueryString(value);
      }

      query += `${key}=${formattedValue}`.concat("&");
    }

    return query;
  }

  static createQueryString(params: Query) {
    let query: string = "";

    for (let key in params) {
      const item: string = params[key as keyof Query];

      if (!item) continue;

      const values = item.split(",");

      if (values.length === 1) {
        query += `${key}:\"${values[0]}*\"`.concat(" ");

        continue;
      }

      query += "(";

      for (const index in values) {
        if (parseInt(index) > 0) query += " OR ";

        query += `${key}:\"${values[index]}*\"`;
      }

      query += ")".concat(" ");
    }

    return query;
  }
}
