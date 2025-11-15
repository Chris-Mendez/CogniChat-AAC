Auth components for Cognichat

Files:
- AuthCard.tsx: Card wrapper for auth forms
- PasswordInput.tsx: Accessible password field with show/hide
- AuthButton.tsx: Primary button used on auth forms
- LogoPanel.tsx: Branding panel used on the left side of screens

Integration notes:
- The screens `frontend/app/login.tsx` and `frontend/app/signup.tsx` use the AuthContext from `frontend/src/context/AuthContext.js`.
- AuthContext currently calls `authService` and `supabase` from the project. To integrate Supabase auth:
  1. Implement `authService.signIn(email, password)` and `authService.signUp(email, password)` to call `supabase.auth.signInWithPassword` and `supabase.auth.signUp` respectively.
  2. Ensure `.env` contains SUPABASE_URL and SUPABASE_ANON_KEY and that `frontend/src/lib/supabase.js` reads them via the project env solution.
  3. On success, AuthContext loads the profile from `therapists` or `clients` tables and sets role accordingly.

Accessibility:
- Buttons and interactive elements have accessibilityRole and labels.
- Colors were chosen for contrast but you should run axe or other accessibility tools to confirm WCAG 2.1 AA compliance.

Next steps:
- Add real signUp calls and better error handling (display toasts/errors to the user).
- Add loading states and animations.
- Consider extracting form validation with a small schema (yup or zod) for better UX.
