import { ICard, IPaginatedResult } from "~/lib/interfaces";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";

export default async function PokemonCardGrid({
  promise,
}: {
  promise: Promise<IPaginatedResult<ICard>>;
}) {
  const { data, totalCount, pageSize, page } = await promise;

  return (
    <>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4">
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
