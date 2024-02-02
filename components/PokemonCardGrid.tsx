import { ICard, IPaginatedResult } from "~/lib/interfaces";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-44 h-44"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>

      <p className="text-xl">Sorry, no results found!</p>
    </div>
  );
}
