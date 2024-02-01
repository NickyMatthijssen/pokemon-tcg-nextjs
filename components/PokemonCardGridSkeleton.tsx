import PokemonCardSkeleton from "./PokemonCardSkeleton";

export default function PokemonCardGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4">
      {Array.from(Array(12).keys()).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );
}
