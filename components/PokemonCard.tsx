"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ICard } from "~/lib/interfaces";
import Skeleton from "./Skeleton";

type Props = {
  card: ICard;
};

export default function PokemonCard({ card }: Props) {
  const [hideImage, setHideImage] = useState<boolean>(true);

  return (
    <div className="mx-auto relative">
      <div className="w-[294px] h-[412px] mx-auto">
        {hideImage && (
          <Skeleton
            width="294px"
            height="412px"
            className="absolute inset-0 z-0"
          />
        )}

        <Image
          src={card.images.large}
          alt={card.name}
          width={294}
          height={412}
          onLoad={() => setHideImage(false)}
          className={clsx("w-[294px] h-[412px]", { "opacity-0": hideImage })}
        />
      </div>

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
