import BackButton from "~/components/BackButton";
import Skeleton from "~/components/Skeleton";

export default function Loading() {
  return (
    <div className="container py-16 max-w-5xl">
      <section className="flex flex-col md:flex-row md:space-x-12 w-full">
        <div className="flex-1 mb-8 md:mb-0">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-3">
              <BackButton />

              <Skeleton className="my-3" />
            </div>

            <div className="space-y-2">
              <Skeleton width="96%" />

              <Skeleton width="44%" className="min-w-[156px]" />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>
                  <Skeleton className="!w-[136px] md:!w-[72px] lg:!w-[136px]" />
                </th>
                <th>
                  <Skeleton className="!w-[129px] md:!w-[72px] lg:!w-[129px]" />
                </th>
                <th>
                  <div className="flex space-x-2">
                    <Skeleton width="76px" />
                    <Skeleton width="30px" className="hidden sm:block" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Skeleton width="30px" />
                </td>
                <td>
                  <Skeleton width="30px" />
                </td>
                <td>
                  <Skeleton width="46px" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex-shrink-0 h-[516.65px] w-fit mx-auto">
          <Skeleton width="356px" height="496px" />

          <Skeleton width="112px" height="8px" className="mt-1.5 ml-auto" />
        </div>
      </section>
    </div>
  );
}
