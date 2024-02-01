import { redirect } from "next/navigation";
import Checkbox from "./Checkbox";
import ExpansionList from "./ExpansionList";
import api from "~/lib/api";
import { Query } from "~/lib/interfaces";
import Link from "next/link";
import { FilterSubmission } from "./FilterSubmission";

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

    redirect(`/1?${params.toString()}`);
  }

  const valueInQuery = (key: string, value: string) =>
    query[key]?.includes(value) ?? false;

  return (
    <form action={filter}>
      <div className="border-b pb-6 px-4 lg:px-0">
        <h3 className="sr-only">Search</h3>

        <input
          name="name"
          type="text"
          className="form-control !mb-0"
          placeholder="Search..."
          defaultValue={query.name}
        />
      </div>

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

      <div className="mt-6 px-4 lg:px-0">
        <FilterSubmission />

        <Link href="/1" className="text-neutral-400 text-xs">
          Reset filters
        </Link>
      </div>
    </form>
  );
}
