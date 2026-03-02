import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/shadcn-card';

const SOLVED = 12;
const GOAL = 20;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ACTIVE_DAYS = [0, 1, 2, 4, 5]; // Mon, Tue, Wed, Fri, Sat have activity

export function WeeklyGoals() {
  const pct = Math.round((SOLVED / GOAL) * 100);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Problems Solved</span>
            <span className="font-medium text-gray-900">{SOLVED}/{GOAL} this week</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between gap-1">
          {DAYS.map((day, i) => (
            <div
              key={day}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  ACTIVE_DAYS.includes(i)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {day.slice(0, 1)}
              </div>
              <span className="text-xs text-gray-500">{day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
