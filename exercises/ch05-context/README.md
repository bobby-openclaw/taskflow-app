# Exercise: Context — Theme Toggle

## Goal
Create a theme context that provides light/dark mode toggling across components.

## Files to Create
- `src/context/ThemeContext.tsx` — exports `ThemeProvider` and `useTheme` hook

## How to Run
```bash
npx vitest exercises/ch05-context/
```

## Requirements
1. `ThemeProvider` wraps children and provides `theme` ("light" | "dark") and `toggleTheme` function
2. `useTheme()` custom hook returns `{ theme, toggleTheme }`
3. Default theme is `"light"`
4. Calling `toggleTheme` switches between "light" and "dark"
5. `ThemeProvider` is a **named export**, `useTheme` is a **named export**

<details>
<summary>💡 Hints</summary>

- `createContext` + `useContext` + `useState`
- The provider value is `{ theme, toggleTheme }`
- `useTheme` is just a wrapper around `useContext(ThemeContext)`

</details>
