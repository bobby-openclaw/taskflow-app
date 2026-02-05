# Exercise: Component Composition

## Goal
Split a monolithic component into well-composed smaller components with proper prop passing.

## Files to Create
- `src/components/TaskItem.tsx` — renders a single task (title, status badge, delete button)
- `src/components/TaskListComposed.tsx` — renders a list of `TaskItem`s
- `src/components/StatusBadge.tsx` — renders a colored badge for the status

## How to Run
```bash
npx vitest exercises/ch03-composition/
```

## Requirements
1. `StatusBadge` accepts a `status` prop and renders it as text
2. `TaskItem` accepts `title`, `status`, and `onDelete` props; uses `StatusBadge`; has a "Delete" button that calls `onDelete`
3. `TaskListComposed` accepts a `tasks` array and `onDeleteTask` callback; renders a `TaskItem` for each task
4. All three are **default exports** from their respective files

<details>
<summary>💡 Hints</summary>

- `StatusBadge` is a pure presentational component — no state needed
- `TaskItem` delegates the status display to `StatusBadge`
- `TaskListComposed` maps over tasks and passes props down

</details>
