import { Suspense } from "react";
import { Sidebar, SidebarProvider, SidebarToggle } from "~/components";
import Filters from "~/components/Filters";
import PokemonCardGrid from "~/components/PokemonCardGrid";
import PokemonCardGridSkeleton from "~/components/PokemonCardGridSkeleton";
import api from "~/lib/api";
import { IParams, Query } from "~/lib/interfaces";

export const revalidate = 3600;
export const fetchCache = "force-cache";

type Props = {
  params: Pick<IParams, "page">;
  searchParams: Query;
};

export function generateMetadata({ params: { page = 1 } }: Props) {
  return {
    title: `Overview - page ${page}`,
    description: `Overview of pokémon tcg cards on page ${page}.`,
  };
}

export default async function Home({ params, searchParams }: Props) {
  const { page = 1 } = params;
  const { ...q } = searchParams;

  const promise = api.getAllCards({
    pageSize: 12,
    page,
    q,
  });

  return (
    <SidebarProvider>
      <div className="container py-16">
        <div className="flex items-baseline justify-between border-b mb-12 pb-6">
          <h1 className="mb-8">Cards</h1>

          <div className="flex items-center">
            <SidebarToggle />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="md:col-span-4 lg:col-span-3 xl:col-span-2">
            <Sidebar title="Filters">
              <Suspense fallback={<div>Loading</div>}>
                {/** @ts-ignore */}
                <Filters query={searchParams} />
              </Suspense>
            </Sidebar>
          </div>
          <div className="md:col-span-8 lg:col-span-9 xl:col-span-10">
            <Suspense fallback={<PokemonCardGridSkeleton />}>
              {/** @ts-ignore */}
              <PokemonCardGrid promise={promise} />
            </Suspense>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
