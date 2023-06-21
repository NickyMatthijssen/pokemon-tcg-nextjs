import Image from "next/image";
import Link from "next/link";
import { ICard } from "~/lib/interfaces";

type Props = {
  card: ICard;
};

export default function PokemonCard({ card }: Props) {
  return (
    <div className="mx-auto relative">
      <Image src={card.images.large} alt={card.name} width={294} height={412} />

      <div className="text-center mt-8">
        <Link
          href={`/cards/${card.id}`}
          className="stretched-link text-xl font-bold"
        >
          {card.name}
        </Link>
      </div>
    </div>
  );
}
