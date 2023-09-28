import Image from "next/image";
import Link from "next/link";
import { ISet } from "~/lib/interfaces";

type Props = {
  set: ISet;
  index?: number | string;
};

export default function Set({ set, index }: Props) {
  return (
    <div className="flex md:space-x-6 flex-col md:flex-row mt-12 w-full">
      <div className="flex-shrink-0 mt-4 mx-auto md:mx-0">
        <Link href={`/?set.id=${set.id}`}>
          <Image src={set.images.logo} alt={set.name} width={160} height={53} />
        </Link>
      </div>

      <div className="flex-1">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{set.name}</td>
            </tr>
            <tr>
              <th>Release date</th>
              <td>{set.releaseDate}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                {index && `${index} /`} {set.total}
              </td>
            </tr>
            <tr>
              <th>Symbol</th>
              <td>
                <Image
                  src={set.images.symbol}
                  alt={`${set.name} symbol`}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
