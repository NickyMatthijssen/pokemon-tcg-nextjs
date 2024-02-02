import { redirect } from "next/navigation";
import Checkbox from "./Checkbox";
import ExpansionList from "./ExpansionList";
import api from "~/lib/api";
import { Query } from "~/lib/interfaces";
import Link from "next/link";
import { FilterSubmission } from "./FilterSubmission";
import { Suspense } from "react";
import ExpansionListLoader from "./ExpansionListLoader";

export default function Filters({
  query,
}: {
  query: Query;
}): React.ReactElement {
  const names = ["name", "types", "subtypes", "set.id", "supertype", "rarity"];

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

      <Suspense fallback={<ExpansionListLoader label="Types" />}>
        {/* @ts-ignore */}
        <Options
          name="types"
          label="Types"
          promise={api.getAllTypes()}
          selected={query["types"]}
        />
      </Suspense>

      <Suspense fallback={<ExpansionListLoader label="Subtypes" />}>
        {/* @ts-ignore */}
        <Options
          name="subtypes"
          label="Subtypes"
          promise={api.getAllSubtypes()}
          selected={query["subtypes"]}
        />
      </Suspense>

      <Suspense fallback={<ExpansionListLoader label="Supertypes" />}>
        {/* @ts-ignore */}
        <Options
          name="supertypes"
          label="Supertypes"
          promise={api.getAllSupertypes()}
          selected={query["supertypes"]}
        />
      </Suspense>

      <Suspense fallback={<ExpansionListLoader label="Rarities" />}>
        {/* @ts-ignore */}
        <Options
          name="rarities"
          label="Rarities"
          promise={api.getAllRarities()}
          selected={query["rarities"]}
        />
      </Suspense>

      <Suspense fallback={<ExpansionListLoader label="Sets" />}>
        {/* @ts-ignore */}
        <Options
          name="set.id"
          label="Sets"
          promise={api.getAllSets()}
          selected={query["set.id"]}
          valueGetter={(set) => set.id}
          labelGetter={(set) => set.name}
        />
      </Suspense>

      <div className="mt-6 px-4 lg:px-0">
        <FilterSubmission />

        <Link href="/1" className="text-neutral-400 text-xs">
          Reset filters
        </Link>
      </div>
    </form>
  );
}

type OptionsProps<T> = {
  name: string;
  label: string;
  promise: Promise<Array<T>>;
  selected?: string[] | string;
  valueGetter?: (value: T) => string;
  labelGetter?: (value: T) => string;
};

async function Options<T extends unknown>({
  name,
  label,
  promise,
  selected,
  valueGetter = (value: T) => value as string,
  labelGetter = (value: T) => value as string,
}: OptionsProps<T>): Promise<React.ReactElement> {
  const options = await promise;

  const valueInQuery = (value: string) => {
    if (typeof selected === "string") {
      selected.split(",");
    }

    return selected?.includes(value) ?? false;
  };

  return (
    <ExpansionList label={label}>
      {options.map((option: T) => {
        const value = valueGetter(option);
        const label = labelGetter(option);

        return (
          <Checkbox
            name={name}
            label={label}
            value={value}
            key={value}
            defaultChecked={valueInQuery(value)}
          />
        );
      })}
    </ExpansionList>
  );
}
