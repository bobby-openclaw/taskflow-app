# Exercise: Effects — localStorage Persistence

## Goal
Create a `PersistentTaskList` component that saves and loads tasks from `localStorage`.

## Files to Create
- `src/components/PersistentTaskList.tsx`

## How to Run
```bash
npx vitest exercises/ch04-effects/
```

## Requirements
1. On mount, load tasks from `localStorage` key `"tasks"`
2. Whenever the task list changes, save it to `localStorage`
3. Users can add tasks (input + "Add" button)
4. Tasks persist across component remounts
5. Be the **default export**

<details>
<summary>💡 Hints</summary>

- Use `useEffect` to sync state to localStorage
- Use lazy initializer in `useState`: `useState(() => JSON.parse(...))`
- `JSON.parse(localStorage.getItem("tasks") || "[]")`

</details>
