import PokemonCardSkeleton from "./PokemonCardSkeleton";

export default function PokemonCardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from(Array(12).keys()).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );
}
