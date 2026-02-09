import { Card, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col items-center justify-center px-4 py-8">
      {/* Logo skeleton */}
      <div className="mb-8">
        <Skeleton width="80px" height="80px" rounded="full" />
      </div>

      {/* Card skeleton */}
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          {/* Titre skeleton */}
          <div className="text-center space-y-2">
            <Skeleton height="36px" width="200px" className="mx-auto" />
            <Skeleton height="20px" width="250px" className="mx-auto" />
          </div>

          {/* Input skeleton */}
          <div>
            <Skeleton height="20px" width="150px" className="mb-2" />
            <Skeleton height="44px" rounded="lg" />
          </div>

          {/* Bouton skeleton */}
          <Skeleton height="48px" rounded="lg" />

          {/* Note skeleton */}
          <Skeleton height="16px" width="200px" className="mx-auto" />
        </div>
      </Card>
    </div>
  );
}
