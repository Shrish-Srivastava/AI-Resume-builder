import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/shadcn-card';
import { allTestsPassed } from '@/lib/testChecklist';
import { Lock, CheckCircle } from 'lucide-react';

export function ShipPage() {
  const unlocked = allTestsPassed();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Ship</h1>
          <Link
            to="/"
            className="text-sm text-primary hover:underline"
          >
            Back to app
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {unlocked ? (
                <>
                  <CheckCircle className="w-6 h-6 text-primary" />
                  Ready to Ship
                </>
              ) : (
                <>
                  <Lock className="w-6 h-6 text-amber-600" />
                  Ship Locked
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {unlocked ? (
              <>
                <p className="text-gray-600">
                  All 10 tests have been passed. The Placement Readiness Platform is ready for shipment.
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                >
                  Return to app
                </Link>
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  Complete all items on the Test Checklist before shipping.
                </p>
                <p className="text-sm text-gray-500">
                  Go to the Test Checklist, verify each item, and check them off. Ship will unlock when all 10 tests pass.
                </p>
                <Link
                  to="/prp/07-test"
                  className="inline-block px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                >
                  Go to Test Checklist
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
