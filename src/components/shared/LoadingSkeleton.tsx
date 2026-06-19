export function PackageCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md animate-pulse">
      <div className="h-56 shimmer-bg" />
      <div className="p-5 space-y-3">
        <div className="h-4 shimmer-bg rounded w-1/3" />
        <div className="h-5 shimmer-bg rounded w-3/4" />
        <div className="h-4 shimmer-bg rounded w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 shimmer-bg rounded w-1/4" />
          <div className="h-8 shimmer-bg rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen shimmer-bg flex items-center justify-center">
      <div className="text-center space-y-6 w-full max-w-3xl px-4">
        <div className="h-8 shimmer-bg rounded-full w-48 mx-auto" />
        <div className="h-16 shimmer-bg rounded w-full" />
        <div className="h-6 shimmer-bg rounded w-3/4 mx-auto" />
        <div className="h-14 shimmer-bg rounded-xl w-full max-w-xl mx-auto" />
      </div>
    </div>
  );
}

export default function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}
    </div>
  );
}
