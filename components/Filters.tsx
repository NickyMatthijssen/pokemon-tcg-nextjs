import { redirect } from "next/navigation";
import Checkbox from "./Checkbox";
import ExpansionList from "./ExpansionList";
import api from "~/lib/api";
import { Query } from "~/lib/interfaces";

export default async function Filters({ query }: { query: Query }) {
  const names = ["name", "types", "subtypes", "set.id", "supertype", "rarity"];

  const [types, subtypes, sets, rarities, supertypes] = await Promise.all([
    api.getAllTypes(),
    api.getAllSubtypes(),
    api.getAllSets(),
    api.getAllRarities(),
    api.getAllSupertypes(),
  ]);

  async function filter(data: FormData) {
    "use server";
    data.getAll("name");

    const params = new URLSearchParams();

    for (const name of names) {
      if (!data.has(name) || !data.getAll(name)[0]) continue;

      params.append(name, data.getAll(name).join(","));
    }

    redirect(`/?${params.toString()}`);
  }

  async function resetFilters() {
    "use server";
    redirect("/");
  }

  const valueInQuery = (key: string, value: string) =>
    query[key]?.includes(value) ?? false;

  return (
    <form action={filter}>
      <h2>Filters</h2>

      <input
        name="name"
        type="text"
        className="form-control"
        placeholder="Search..."
        defaultValue={query.name}
      />

      <ExpansionList label="Types">
        {types.map((type) => (
          <Checkbox
            name="types"
            label={type}
            value={type}
            key={type}
            defaultChecked={valueInQuery("types", type)}
          />
        ))}
      </ExpansionList>

      <ExpansionList label="Subtypes">
        {subtypes.map((subtype) => (
          <Checkbox
            name="subtypes"
            label={subtype}
            value={subtype}
            key={subtype}
            defaultChecked={valueInQuery("subtypes", subtype)}
          />
        ))}
      </ExpansionList>

      <ExpansionList label="Supertypes">
        {supertypes.map((type) => (
          <Checkbox
            name="supertype"
            label={type}
            value={type}
            key={type}
            defaultChecked={valueInQuery("supertype", type)}
          />
        ))}
      </ExpansionList>

      <ExpansionList label="Rarities">
        {rarities.map((type) => (
          <Checkbox
            name="rarity"
            label={type}
            value={type}
            key={type}
            defaultChecked={valueInQuery("rarity", type)}
          />
        ))}
      </ExpansionList>

      <ExpansionList label="Sets">
        {sets.map((set) => (
          <Checkbox
            name="set.id"
            label={set.name}
            value={set.id}
            key={set.id}
            defaultChecked={valueInQuery("set.id", set.id)}
          />
        ))}
      </ExpansionList>

      <button className="button button--full">Search</button>

      <button className="text-neutral-400 text-xs" formAction={resetFilters}>
        Reset filters
      </button>
    </form>
  );
}
