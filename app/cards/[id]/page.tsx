import clsx from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Ability from "~/components/Ability";
import Attack from "~/components/Attack";
import BackButton from "~/components/BackButton";
import Effectivenesses from "~/components/Effectivenesses";
import EnergyList from "~/components/EnergyList";
import Set from "~/components/Set";
import api from "~/lib/api";
import { IAbility, ICard } from "~/lib/interfaces";

export const revalidate = 3600;
export const fetchCache = "force-cache";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const card = await api.getCardById(params.id);

  if (!card) {
    return notFound();
  }

  return {
    title: card.name,
    description: `${card.name} is card ${card.number} of ${card.set.printedTotal} released in the ${card.set.name}.`,
    openGraph: {
      images: [
        {
          url: card.images.small,
        },
      ],
    },
  };
}

export default async function CardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // A small throttle to prevent flashing.
  const card = await new Promise<ICard>((resolve) =>
    setTimeout(() => resolve(api.getCardById(id)), 200)
  );

  return (
    <div className="container py-16 max-w-5xl">
      <section className="flex flex-col md:flex-row md:space-x-12 w-full">
        <div className="flex-1 mb-8 md:mb-0">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-3">
              <BackButton />

              <h1>{card.name}</h1>
            </div>

            <p className="text-neutral-400">{card.flavorText}</p>
          </div>

          {card.rules && (
            <section className="mb-8">
              <h2>Rules</h2>

              <div className="space-y-2">
                {card.rules.map((rule, index) => (
                  <p key={index}>{rule}</p>
                ))}
              </div>
            </section>
          )}

          {(card.ancientTrait || card.abilities) && (
            <section className="my-8">
              <h2>Abilities</h2>

              <div className="space-y-4">
                {card.abilities &&
                  card.abilities.map((ability: IAbility) => (
                    <Ability ability={ability} key={ability.name} />
                  ))}

                {card.ancientTrait && <Ability ability={card.ancientTrait} />}
              </div>
            </section>
          )}

          {card.supertype === "Pokémon" && (
            <table>
              <thead>
                <tr>
                  <th>Weaknesses</th>
                  <th>Resistances</th>
                  <th>Retreat cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {card.weaknesses ? (
                      <Effectivenesses effectivenesses={card.weaknesses} />
                    ) : (
                      <>-</>
                    )}
                  </td>
                  <td>
                    {card.resistances ? (
                      <Effectivenesses effectivenesses={card.resistances} />
                    ) : (
                      <>-</>
                    )}
                  </td>
                  <td>
                    {card.retreatCost ? (
                      <EnergyList types={card.retreatCost} />
                    ) : (
                      <>-</>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="flex-shrink-0">
          <div className="w-[356px] mx-auto">
            <Image
              src={card.images.large}
              width={356}
              height={496}
              alt={card.name}
            />

            <p className="text-right text-xs text-neutral-400 mt-1">
              Artist: {card.artist}
            </p>
          </div>
        </div>
      </section>

      {!!card.attacks && (
        <section className="my-8">
          <h2>Attack</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {card.attacks.map((attack, index) => (
              <div
                key={attack.name}
                className={clsx(
                  index % 2 === 0 &&
                    index === (card.attacks?.length ?? 1) - 1 &&
                    "md:col-span-2"
                )}
              >
                <Attack attack={attack} />
              </div>
            ))}
          </div>
        </section>
      )}

      <Set set={card.set} index={card.number} />
    </div>
  );
}
