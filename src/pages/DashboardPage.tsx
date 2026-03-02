import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/shadcn-card';
import {
  OverallReadiness,
  SkillBreakdown,
  ContinuePractice,
  WeeklyGoals,
  UpcomingAssessments,
} from '@/components/dashboard';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h2>
        <p className="text-gray-600 text-sm">
          Track your progress and stay on top of your placement prep.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <OverallReadiness />
          </CardContent>
        </Card>

        {/* Skill Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="min-w-0">
            <SkillBreakdown />
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <ContinuePractice />

        {/* Weekly Goals */}
        <WeeklyGoals />

        {/* Upcoming Assessments - spans full width on 2-col layout */}
        <div className="lg:col-span-2">
          <UpcomingAssessments />
        </div>
      </div>
    </div>
  );
}
