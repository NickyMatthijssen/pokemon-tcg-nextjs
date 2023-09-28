import { Suspense } from "react";
import { Sidebar, SidebarProvider, SidebarToggle } from "~/components";
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
    <SidebarProvider>
      <div className="container py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 lg:col-span-3 xl:col-span-2">
            <Sidebar>
              {/** @ts-ignore */}
              <Filters query={searchParams} />
            </Sidebar>
          </div>
          <div className="md:col-span-8 lg:col-span-9 xl:col-span-10">
            <div>
              <h1 className="mb-8">Cards</h1>

              <SidebarToggle />
            </div>

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
