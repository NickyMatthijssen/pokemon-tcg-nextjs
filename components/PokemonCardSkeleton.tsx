import Skeleton from "./Skeleton";

export default function PokemonCardSkeleton() {
  return (
    <div className="mx-auto mb-8">
      <Skeleton className="mx-auto" width="294px" height="412px" />

      <div className="mt-8 h-[28px] flex items-center justify-center">
        <Skeleton className="mx-auto" width="220px" height="24.5px" />
      </div>
    </div>
  );
}
