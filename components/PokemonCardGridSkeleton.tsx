import PokemonCardSkeleton from "./PokemonCardSkeleton";
import Skeleton from "./Skeleton";

export default function PokemonCardGridSkeleton() {
  return (
    <>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4">
        {Array.from(Array(12).keys()).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-neutral-700 mt-4 py-3">
        <Skeleton height="20px" width="220px" className="hidden sm:block" />
        <Skeleton height="36px" width="280px" className="hidden sm:block" />

        <Skeleton height="36px" width="91.72px" className="sm:hidden" />
        <Skeleton height="36px" width="65.43px" className="sm:hidden" />
      </div>
    </>
  );
}
