import { IEffectiveness } from "~/lib/interfaces";
import Energy from "./Energy";

export default function Effectiveness({
  effectiveness,
}: {
  effectiveness: IEffectiveness;
}) {
  return (
    <div className="flex space-x-2 items-center">
      <div className="flex-shrink-0">
        <Energy energy={effectiveness.type} />
      </div>
      <span className="text-lg font-semibold">{effectiveness.value}</span>
    </div>
  );
}
