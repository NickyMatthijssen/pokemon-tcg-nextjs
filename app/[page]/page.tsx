import { Suspense } from "react";
import Filters from "~/components/Filters";
import PokemonCardGrid from "~/components/PokemonCardGrid";
import PokemonCardGridSkeleton from "~/components/PokemonCardGridSkeleton";
import Sidebar from "~/components/Sidebar";
import { SidebarProvider } from "~/components/SidebarProvider";
import SidebarToggle from "~/components/SidebarToggle";
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

  // This key helps with showing the suspense again if only the query params change.
  const key = new URLSearchParams(searchParams).toString();

  const promise = api.getAllCards({
    pageSize: 12,
    page,
    q: searchParams,
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
              <Filters query={searchParams} />
            </Sidebar>
          </div>
          <div className="md:col-span-8 lg:col-span-9 xl:col-span-10">
            <Suspense fallback={<PokemonCardGridSkeleton />} key={key}>
              {/* @ts-ignore */}
              <PokemonCardGrid promise={promise} />
            </Suspense>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
