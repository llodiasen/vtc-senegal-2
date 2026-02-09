import { Header, PageContainer } from '@/components/layout';
import { Card, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Historique" />
      <PageContainer className="py-6">
        <div className="space-y-4">
          {/* 3-5 cards skeleton */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index}>
              <div className="space-y-3">
                {/* Date et badge */}
                <div className="flex items-center justify-between">
                  <Skeleton height="16px" width="120px" />
                  <Skeleton height="24px" width="80px" rounded="full" />
                </div>
                {/* Départ → Arrivée */}
                <div className="flex items-center gap-2">
                  <Skeleton height="16px" width="40%" />
                  <Skeleton height="20px" width="20px" />
                  <Skeleton height="16px" width="40%" />
                </div>
                {/* Prix */}
                <div className="pt-2 border-t border-gray-100">
                  <Skeleton height="24px" width="100px" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
