# Exercise: Your First Component

## Goal
Create a `TaskCard` component that displays a task's title, status, and priority.

## Files to Create
- `src/components/TaskCard.tsx`

## How to Run
```bash
npx vitest exercises/ch01-first-component/
```

## Requirements
Your `TaskCard` component must:
1. Accept props: `title` (string), `status` (string), `priority` (string)
2. Render the title in an element with `role="heading"`
3. Display the status text somewhere in the card
4. Display the priority text somewhere in the card
5. Be the **default export** of the file

<details>
<summary>💡 Hints</summary>

- Use an `interface` or `type` for your props
- `<h3>` has an implicit heading role
- Start simple — a `<div>` with the three pieces of info is enough

</details>
