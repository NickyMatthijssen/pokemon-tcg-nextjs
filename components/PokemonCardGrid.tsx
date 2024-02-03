import { ICard, IPaginatedResult } from "~/lib/interfaces";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default async function PokemonCardGrid({
  promise,
}: {
  promise: Promise<IPaginatedResult<ICard>>;
}) {
  const { data, totalCount, pageSize, page } = await promise;

  if (!data || data?.length < 1) {
    return <NoResultsWarning />;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4">
        {data.map((card: ICard) => (
          <PokemonCard card={card} key={card.id} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalResources={totalCount}
        pageSize={pageSize}
        prefix="/"
      />
    </>
  );
}

function NoResultsWarning(): React.ReactElement {
  return (
    <div className="flex flex-col space-y-12 justify-center items-center h-[60vh]">
      <ExclamationCircleIcon className="w-44 h-44" />

      <p className="text-xl">Sorry, no results found!</p>
    </div>
  );
}
