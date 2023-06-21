import { Suspense } from "react";
import Filters from "~/components/Filters";
import PokemonCardGrid from "~/components/PokemonCardGrid";
import PokemonCardGridSkeleton from "~/components/PokemonCardGridSkeleton";
import api from "~/lib/api";
import { IParams, Query } from "~/lib/interfaces";

export const revalidate = 3600;

type Props = {
  searchParams: Query & Pick<IParams, "page">;
};

export default async function Home({ searchParams }: Props) {
  const { page = 1, ...q } = searchParams;

  const promise = api.getAllCards({
    pageSize: 12,
    page,
    q,
  });

  return (
    <div className="container py-16">
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-2">
          {/** @ts-ignore */}
          <Filters query={searchParams} />
        </div>
        <div className="col-span-10">
          <h1 className="mb-8">Cards</h1>

          <Suspense fallback={<PokemonCardGridSkeleton />}>
            {/** @ts-ignore */}
            <PokemonCardGrid promise={promise} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
