import { IAttack } from "~/lib/interfaces";
import EnergyList from "./EnergyList";

type Props = {
  attack: IAttack;
};

export default function Attack({ attack }: Props) {
  return (
    <div className="flex justify-between space-x-2">
      <div>
        <h3>{attack.name}</h3>
        <p>{attack.text}</p>
      </div>

      <div className="min-w-[48px] text-right">
        <p className="mb-2 text-2xl font-bold">{attack.damage || "-"}</p>

        <div className="w-[48px]">
          <EnergyList types={attack.cost} />
        </div>
      </div>
    </div>
  );
}
