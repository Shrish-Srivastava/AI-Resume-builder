# AI ATS Resume Builder — Test Checklist

## Empty State Test

**Steps:** Click "Clear All" (or manually clear localStorage and refresh).

**Expected:**
- Score: **0 / 100** — "Needs Work" (red)
- Suggestions list exactly what to add (name, email, summary, experience, education, skills, project, phone, LinkedIn, GitHub, action verbs)
- No crash

## Incremental Score Test

| Action | Expected Score | Cumulative |
|--------|----------------|------------|
| Add name | +10 | 10 |
| Add email | +10 | 20 |
| Add summary > 50 chars | +10 | 30 |
| Add 1 project | +10 | 40 |
| Add 5 skills | +10 | 50 |

**Remove summary** → Score drops by 10 instantly.

## Action Verb Test

| Summary Text | +10 for action verbs? |
|--------------|------------------------|
| "Passionate engineer." | No |
| "Built scalable backend systems." | Yes ("built") |

## Template Stability Test

Switch between Classic, Modern, Minimal. **Score must not change.**  
Switch color theme. **Theme must not affect score.**

## Refresh Test

Fill entire resume → Refresh page.

**Expected:** Data, score (derived from data), theme, template all persist (theme/template in localStorage).

## localStorage Reset Test

1. DevTools → Application → Local Storage → Clear all
2. Refresh

**Expected:**
- App recovers cleanly
- Empty form
- Score 0, "Needs Work"
- No crash

## Mobile Test (375px width)

- Preview stacks below form
- Score visible
- No horizontal overflow

## Console Test

Navigate: / → /builder → /preview → /proof

**Expected:** Zero red errors. Warnings acceptable if controlled.

---

## ATS Score Rules (Reference)

| Rule | Points |
|------|--------|
| Name provided | +10 |
| Email provided | +10 |
| Summary > 50 chars | +10 |
| At least 1 experience with bullets | +15 |
| At least 1 education entry | +10 |
| At least 5 skills | +10 |
| At least 1 project | +10 |
| Phone provided | +5 |
| LinkedIn provided | +5 |
| GitHub provided | +5 |
| Summary has action verbs (built, led, designed, etc.) | +10 |
| **Max** | **100** |

## Score Zones (Circular Progress)

- **0–40**: Red — "Needs Work"
- **41–70**: Amber — "Getting There"
- **71–100**: Green — "Strong Resume"

---

## 10-Item Test Checklist

### 1. All form sections save to localStorage

- [ ] Fill Personal Info, Summary, Education, Experience, Projects, Skills, Links
- [ ] Refresh page
- [ ] All data persists
- [ ] Check `resumeBuilderData` in Application → Local Storage

### 2. Live preview updates in real-time

- [ ] Type in form (e.g. name, summary)
- [ ] Preview panel updates immediately
- [ ] No delay or "Submit" needed

### 3. Template switching preserves data

- [ ] Fill resume with data
- [ ] Switch: Classic → Modern → Minimal
- [ ] Content stays identical
- [ ] Only layout changes

### 4. Color theme persists after refresh

- [ ] Select Navy or Burgundy
- [ ] Refresh page
- [ ] Color still selected
- [ ] Check `resumeTheme` in localStorage

### 5. ATS score calculates correctly

- [ ] Empty resume: score 0
- [ ] Add name (+10), email (+10): score 20
- [ ] Add summary > 50 chars (+10): score 30
- [ ] Add 1 experience with bullets (+15): score 45
- [ ] Add 1 education (+10): score 55
- [ ] Add 5 skills (+10): score 65
- [ ] Add 1 project (+10): score 75
- [ ] Add phone (+5), GitHub (+5), LinkedIn (+5): score 90
- [ ] Add action verbs to summary (+10): score 100

### 6. Score updates live on edit

- [ ] Start with low score
- [ ] Add name — score increases immediately
- [ ] Add more items — score updates without refresh
- [ ] Remove items — score decreases

### 7. Export buttons work (copy/download)

- [ ] **Print / Save as PDF**: Opens print dialog, toast appears
- [ ] **Copy Resume as Text**: Paste into Notepad — structured text with headings

### 8. Empty states handled gracefully

- [ ] Clear all data
- [ ] No crashes
- [ ] Copy as Text still outputs structured headings
- [ ] ATS score shows 0 with suggestions
- [ ] Modern template with no skills: sidebar renders cleanly

### 9. Mobile responsive layout works

- [ ] Resize browser or use DevTools mobile view
- [ ] Form and preview stack or scroll
- [ ] No horizontal overflow
- [ ] Buttons and inputs usable

### 10. No console errors on any page

- [ ] Open Builder — no red errors
- [ ] Open Preview — no red errors
- [ ] Open Home, Proof, etc. — no red errors
- [ ] Perform common actions (add/remove entries, switch template)

---

## Improvement Suggestions Format

Each suggestion shows the point value:

- "Add your name (+10 points)"
- "Add a professional summary (50+ characters) (+10 points)"
- "Add at least 1 experience entry with bullets (+15 points)"
