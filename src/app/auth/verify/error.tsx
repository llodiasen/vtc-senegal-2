'use client';

import { useRouter } from 'next/navigation';
import { ErrorMessage, Button } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <ErrorMessage
          message="Une erreur est survenue"
          onRetry={reset}
        />
        <Button
          variant="outline"
          onClick={() => router.push('/')}
          className="w-full mt-4"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
