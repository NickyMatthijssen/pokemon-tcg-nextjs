"use client";

import Image from "next/image";
import { Type } from "~/lib/types";

type Props = {
  energy: Type;
};

export default function Energy({ energy }: Props) {
  return (
    <Image
      src={`/images/${energy.toLowerCase()}.png`}
      width={20}
      height={20}
      alt={energy}
    />
  );
}
