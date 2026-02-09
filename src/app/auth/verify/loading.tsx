import { Card, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col items-center justify-center px-4 py-8">
      {/* Card skeleton */}
      <Card className="w-full max-w-md text-center">
        {/* Titre skeleton */}
        <Skeleton height="36px" width="150px" className="mx-auto mb-4" />
        <Skeleton height="20px" width="200px" className="mx-auto mb-8" />

        {/* OTP inputs skeleton */}
        <div className="flex gap-2 justify-center mb-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              width="56px"
              height="56px"
              rounded="lg"
            />
          ))}
        </div>

        {/* Boutons skeleton */}
        <div className="mt-8 space-y-4">
          <Skeleton height="48px" rounded="lg" />
          <Skeleton height="48px" rounded="lg" />
        </div>
      </Card>
    </div>
  );
}
