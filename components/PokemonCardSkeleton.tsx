import Skeleton from "./Skeleton";

export default function PokemonCardSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="mx-auto" width="294.28px" height="412px" />

      <Skeleton className="mt-8 mx-auto" width="220px" height="24px" />
    </div>
  );
}
