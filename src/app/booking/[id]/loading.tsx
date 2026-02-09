import { Header, PageContainer } from '@/components/layout';
import { Card, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Course en cours" showBack />
      <PageContainer className="py-6 space-y-6">
        {/* Skeleton statut */}
        <Card>
          <div className="space-y-3">
            <Skeleton height="24px" width="200px" />
            <Skeleton height="16px" width="150px" />
            <Skeleton height="4px" rounded="full" className="mt-4" />
          </div>
        </Card>

        {/* Skeleton driver card */}
        <Card>
          <div className="flex items-center gap-4">
            <Skeleton width="80px" height="80px" rounded="full" />
            <div className="flex-1 space-y-2">
              <Skeleton height="20px" width="150px" />
              <Skeleton height="16px" width="100px" />
              <Skeleton height="16px" width="120px" />
            </div>
          </div>
        </Card>

        {/* Skeleton carte */}
        <Card>
          <Skeleton height="300px" rounded="lg" />
        </Card>
      </PageContainer>
    </div>
  );
}
