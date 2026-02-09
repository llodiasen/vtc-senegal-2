import { Header, PageContainer } from '@/components/layout';
import { Card, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Nouvelle course" showBack />
      <PageContainer className="py-6 space-y-6">
        <Card>
          <div className="space-y-4">
            {/* Skeleton input départ */}
            <div>
              <Skeleton height="20px" width="80px" className="mb-2" />
              <Skeleton height="44px" rounded="lg" />
            </div>
            {/* Skeleton input arrivée */}
            <div>
              <Skeleton height="20px" width="80px" className="mb-2" />
              <Skeleton height="44px" rounded="lg" />
            </div>
            {/* Skeleton bouton */}
            <Skeleton height="48px" rounded="lg" className="mt-6" />
          </div>
        </Card>
      </PageContainer>
    </div>
  );
}
