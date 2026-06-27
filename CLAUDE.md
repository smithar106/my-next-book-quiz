
---

# CLEAN DEPLOY INSTRUCTIONS — RUN BEFORE EVERY PRODUCTION DEPLOY

Every deploy to production must follow these steps in order.
Do not deploy from a dirty working tree. A stale cache or
TypeScript error will produce a broken deploy.

## STEP 1 — Confirm clean working tree
git status
Expected: nothing to commit, working tree clean

## STEP 2 — Pull latest from main
git pull origin main

## STEP 3 — Clear cache and reinstall
rm -rf node_modules .next
npm install
Expected: no errors, no peer dependency conflicts

## STEP 4 — TypeScript check
npm run typecheck (or npx tsc --noEmit)
Expected: 0 errors. Fix all errors before deploying.

## STEP 5 — Production build check
npm run build
Expected: build completes with 0 errors.
If the build fails locally it will fail in production.
Fix it before pushing.

## STEP 6 — Deploy
git push origin main
Vercel (or Railway) will auto-deploy on push to main.
Watch the deployment logs — confirm deploy succeeds before
announcing the update is live.

## STEP 7 — Verify in production
After deploy completes:
- Open the live quiz URL
- Complete the full quiz flow end to end
- Confirm the result page shows correctly
- Confirm the App Store CTA link works
- Confirm the blurred book reveal is visible on the result page

## DEPLOY CHECKLIST
[ ] git status — clean working tree
[ ] git pull origin main — local is up to date
[ ] node_modules and .next deleted and reinstalled
[ ] npm run typecheck — 0 errors
[ ] npm run build — completes with 0 errors
[ ] git push — deploy triggered
[ ] Deployment logs show success
[ ] Quiz flow verified end to end in production
[ ] Blurred book reveal visible on result page
[ ] App Store CTA link working

## IF THE DEPLOY FAILS
1. Read the full error in the deployment logs — do not guess
2. Run npm run build locally and fix the error there first
3. Check the last 3 commits — what changed recently?
4. Never push a broken build to main — fix it on a branch first
