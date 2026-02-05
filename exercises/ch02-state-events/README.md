# Exercise: State & Events — Task CRUD

## Goal
Build a `TaskList` component that lets users add, delete, and toggle tasks.

## Files to Create
- `src/components/TaskList.tsx`

## How to Run
```bash
npx vitest exercises/ch02-state-events/
```

## Requirements
1. Render an input field and an "Add" button
2. Typing in the input and clicking "Add" creates a new task
3. Each task displays its title and a "Delete" button
4. Clicking "Delete" removes that task
5. Each task has a checkbox — toggling it marks the task complete (strikethrough via `line-through` style or CSS class)
6. Be the **default export**

<details>
<summary>💡 Hints</summary>

- Use `useState` for both the input value and the task list
- Each task needs a unique `id` — `Date.now()` or `crypto.randomUUID()` works
- Use `style={{ textDecoration: "line-through" }}` or a class for completed tasks

</details>
