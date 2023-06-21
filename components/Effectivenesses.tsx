import { IEffectiveness } from "~/lib/interfaces";
import Effectiveness from "./Effectiveness";

export default function Effectivenesses({
  effectivenesses,
}: {
  effectivenesses: IEffectiveness[];
}) {
  return (
    <div>
      {effectivenesses.map((effectiveness: IEffectiveness) => (
        <Effectiveness effectiveness={effectiveness} key={effectiveness.type} />
      ))}
    </div>
  );
}
