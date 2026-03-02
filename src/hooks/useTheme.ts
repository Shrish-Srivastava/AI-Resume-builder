import { useState, useCallback } from 'react';
import { loadTheme, saveTheme, getThemeColor, type ResumeThemeId } from '@/lib/resumeTheme';

export function useTheme() {
  const [themeId, setThemeIdState] = useState<ResumeThemeId>(loadTheme);

  const setTheme = useCallback((id: ResumeThemeId) => {
    setThemeIdState(id);
    saveTheme(id);
  }, []);

  const accentColor = getThemeColor(themeId);

  return [themeId, setTheme, accentColor] as const;
}
