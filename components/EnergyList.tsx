import { Type } from "~/lib/types";
import Energy from "./Energy";

export default function EnergyList({ types }: { types: Type[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type, index) => (
        <Energy energy={type} key={index} />
      ))}
    </div>
  );
}
