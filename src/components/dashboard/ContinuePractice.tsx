import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/shadcn-card';

const TOPIC = 'Dynamic Programming';
const COMPLETED = 3;
const TOTAL = 10;

export function ContinuePractice({ completed = COMPLETED, total = TOTAL }: { completed?: number; total?: number } = {}) {
  const isComplete = total > 0 && completed >= total;
  const pct = total > 0 ? Math.round((Math.min(completed, total) / total) * 100) : 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Continue Practice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isComplete ? (
          <p className="text-sm font-medium text-primary">All topics complete!</p>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-900">{TOPIC}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{completed}/{total} completed</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
      {!isComplete && (
        <CardFooter>
          <button
            type="button"
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
          >
            Continue
          </button>
        </CardFooter>
      )}
    </Card>
  );
}
