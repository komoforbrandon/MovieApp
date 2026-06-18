export default function MovieLoader() {
    return (
        <div className="overflow-y-scroll no-scrollbar w-full">
        <div className="px-2 w-fit overlow-y-scroll flex flex-row gap-4">
        {Array.from({ length: 15 }, (_, index) => (
          <div
            key={`movie-${index}`}
            className="w-44 md:w-46 h-fit overflow-hidden rounded-sm"
          >
            <div className="h-68 animate-pulse bg-slate-200 md:h-70 dark:bg-slate-800" />
            {/* <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-full space-y-2">
                  <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-7 w-14 shrink-0 animate-pulse rounded-full bg-amber-400/20" />
              </div>
            </div> */}
          </div>
        ))}
      </div>
      </div>
    )
}