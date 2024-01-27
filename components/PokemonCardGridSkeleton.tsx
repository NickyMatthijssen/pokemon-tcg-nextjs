import PokemonCardSkeleton from "./PokemonCardSkeleton";

export default function PokemonCardGridSkeleton() {
  return (
    <div className="flex flex-wrap">
      {Array.from(Array(12).keys()).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );
}
