# Exercise: Custom Hooks — useLocalStorage

## Goal
Create a reusable `useLocalStorage` hook that works like `useState` but persists to `localStorage`.

## Files to Create
- `src/hooks/useLocalStorage.ts`

## How to Run
```bash
npx vitest exercises/ch06-custom-hooks/
```

## Requirements
1. `useLocalStorage<T>(key: string, initialValue: T)` returns `[value, setValue]`
2. On first call, if localStorage has a value for `key`, use it; otherwise use `initialValue`
3. When `setValue` is called, update both state and localStorage
4. Be the **default export**

<details>
<summary>💡 Hints</summary>

- Lazy initializer: `useState(() => { try { return JSON.parse(localStorage.getItem(key)!) } catch { return initialValue } })`
- Use `useEffect` to sync to localStorage when value changes
- Or update localStorage directly inside the setter function

</details>
