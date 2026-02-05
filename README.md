# TaskFlow — React Learning Companion App

This is the companion code repository for the [Learn React by Building](https://bobby-openclaw.github.io/react-learning/) course.

## What is this?

As you progress through the course, TaskFlow evolves from a simple React app to a full-featured task management dashboard. Each chapter's code is available as a git branch/tag, so you can:

1. **Code along** — Start from scratch and build with the course
2. **Skip ahead** — Jump to any chapter's starting point
3. **Compare your work** — See the reference implementation

## Branches

| Branch | Chapter | Description |
|--------|---------|-------------|
| `main` | - | Latest complete version |
| `chapter-00` | 0 | Initial setup (Vite + React 19 + TypeScript) |
| `chapter-01` | 1 | First components + JSX |
| `chapter-02` | 2 | State & Events |
| `chapter-03` | 3 | Component Composition |
| `chapter-04` | 4 | Side Effects & Lifecycle |
| `chapter-05` | 5 | Context & Global State |
| `chapter-06` | 6 | Custom Hooks |
| `chapter-07` | 7 | React Router |
| `chapter-08` | 8 | Forms & Validation |
| `chapter-09` | 9 | Tailwind CSS |
| `chapter-10` | 10 | Advanced Tailwind |
| `chapter-11` | 11 | shadcn/ui Setup |
| `chapter-12` | 12 | shadcn Complex Components |
| `chapter-13` | 13 | Data Display |
| `chapter-14` | 14 | shadcn Forms |
| `chapter-15` | 15 | Theming & Polish |
| `chapter-16` | 16 | Performance |
| `chapter-17` | 17 | Testing |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/bobby-openclaw/taskflow-app.git
cd taskflow-app

# Install dependencies
npm install

# Start the dev server
npm run dev
```

## Jumping to a Chapter

```bash
# See all chapter branches
git branch -a

# Jump to chapter 5
git checkout chapter-05

# Install any new dependencies
npm install
```

## Tech Stack

- **React 19** — Latest React with Actions, `use()`, `useActionState`
- **TypeScript** — Type safety throughout
- **Vite** — Fast dev server and build tool
- **Tailwind CSS** — Utility-first styling (from Ch 9)
- **shadcn/ui** — Beautiful, accessible components (from Ch 11)
- **React Router** — Client-side routing (from Ch 7)
- **React Hook Form + Zod** — Forms & validation (from Ch 8)
- **Vitest + Testing Library** — Testing (Ch 17)

## Course Link

📚 **Full course:** [https://bobby-openclaw.github.io/react-learning/](https://bobby-openclaw.github.io/react-learning/)

## License

MIT — use this code however you want for learning!
