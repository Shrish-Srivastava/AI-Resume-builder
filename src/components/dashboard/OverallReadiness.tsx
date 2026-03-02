const MAX = 100;
const SIZE = 160;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CENTER = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function clamp(score: number) {
  return Math.min(MAX, Math.max(0, score));
}

export function OverallReadiness({ score = 72 }: { score?: number }) {
  const clamped = clamp(score);
  const offset = CIRCUMFERENCE - (clamped / MAX) * CIRCUMFERENCE;
  return (
    <div className="relative inline-flex" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          className="text-gray-200"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="text-primary transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{clamped}</span>
        <span className="text-xs font-medium text-gray-500">Readiness Score</span>
      </div>
    </div>
  );
}
