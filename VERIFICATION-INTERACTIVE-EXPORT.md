# Interactive Results & Export — Verification Steps

## 1. Live Score

- **Formula**: base (from analysis) + 2 per "I know" − 2 per "Need practice"  
- **Bounds**: 0–100  
- **Real-time**: Score updates immediately when toggling skills  

**How to verify**:
1. Open Results for an analysis with skills.
2. Check the circular score.
3. Toggle a skill to "I know" → score increases by 2.
4. Toggle to "Need practice" → score decreases by 2.
5. Toggle multiple skills → score updates each time.

---

## 2. Toggles Persist After Refresh

- **Storage**: `skillConfidenceMap` saved in the history entry via `updateEntry()`  
- **Reopen**: History → click entry → toggles and score remain  

**How to verify**:
1. Open Results and toggle some skills (e.g. React → "I know").
2. Refresh (F5).
3. Confirm toggles and score are unchanged.
4. Go to History → click another entry → return to the first.
5. Confirm toggles still persist.

---

## 3. Export Tools

| Button                | Action                                                |
|-----------------------|--------------------------------------------------------|
| Copy 7-day plan       | Copies plan as plain text to clipboard                |
| Copy round checklist  | Copies checklist as plain text                        |
| Copy 10 questions     | Copies questions as plain text                        |
| Download as TXT       | Downloads a single file with all sections             |

**How to verify**:
1. Click "Copy 7-day plan" → paste elsewhere → plan appears.
2. Click "Copy round checklist" → paste → checklist appears.
3. Click "Copy 10 questions" → paste → questions appear.
4. Click "Download as TXT" → file downloads with all sections.

---

## 4. History Consistency

- **On toggle**: `updateEntry(id, { skillConfidenceMap })` updates `localStorage`  
- **From History**: Load entry with `skillConfidenceMap` and render toggles and live score  

**How to verify**:
1. Toggle skills on Results.
2. Go to History.
3. Click the same entry.
4. Confirm toggles and live score match.

---

## 5. Action Next Box

- **Top 3 weak skills**: Skills marked "Need practice" (first 3)  
- **Suggestion**: "Start Day 1 plan now."  
- **If all known**: Same suggestion, no weak skills listed  

**How to verify**:
1. Ensure some skills are "Need practice" → box shows top 3 weak skills.
2. Mark all as "I know" → box shows only the suggestion.
