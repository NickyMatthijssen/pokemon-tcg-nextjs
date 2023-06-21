import { IAbility, IAncientTrait } from "~/lib/interfaces";

export default function Ability({
  ability,
}: {
  ability: IAbility | IAncientTrait;
}) {
  return (
    <div>
      <h3>{ability.name}</h3>
      <p>{ability.text}</p>
    </div>
  );
}
