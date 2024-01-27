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
      <div className="flex flex-wrap">
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
