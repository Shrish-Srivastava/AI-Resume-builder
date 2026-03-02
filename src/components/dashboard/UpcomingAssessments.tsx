import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/shadcn-card';
import { Calendar, Clock } from 'lucide-react';

const ITEMS = [
  { title: 'DSA Mock Test', when: 'Tomorrow', time: '10:00 AM' },
  { title: 'System Design Review', when: 'Wed', time: '2:00 PM' },
  { title: 'HR Interview Prep', when: 'Friday', time: '11:00 AM' },
];

export function UpcomingAssessments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {ITEMS.map((item) => (
            <li key={item.title} className="flex items-start gap-3 pb-4 last:pb-0 border-b border-gray-100 last:border-0">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  {item.when}, {item.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
