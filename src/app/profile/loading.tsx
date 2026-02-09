import { Header, PageContainer } from '@/components/layout';
import { Card, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Mon profil" />
      <PageContainer className="py-6 space-y-6">
        {/* Skeleton avatar et infos */}
        <Card className="flex flex-col items-center py-6">
          <Skeleton width="96px" height="96px" rounded="full" className="mb-4" />
          <div className="flex items-center gap-2 mb-2">
            <Skeleton height="32px" width="150px" />
            <Skeleton height="32px" width="32px" rounded="md" />
          </div>
          <Skeleton height="20px" width="120px" />
        </Card>

        {/* Skeleton stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <div className="flex flex-col items-center text-center">
              <Skeleton width="48px" height="48px" rounded="full" className="mb-2" />
              <Skeleton height="16px" width="60px" className="mb-1" />
              <Skeleton height="32px" width="40px" />
            </div>
          </Card>
          <Card>
            <div className="flex flex-col items-center text-center">
              <Skeleton width="48px" height="48px" rounded="full" className="mb-2" />
              <Skeleton height="16px" width="80px" className="mb-1" />
              <Skeleton height="32px" width="100px" />
            </div>
          </Card>
        </div>

        {/* Skeleton section paramètres */}
        <Card>
          <Skeleton height="24px" width="100px" className="mb-4" />
          <Skeleton height="16px" width="120px" className="mx-auto py-4" />
        </Card>

        {/* Skeleton bouton déconnexion */}
        <Skeleton height="48px" rounded="lg" />
      </PageContainer>
    </div>
  );
}
