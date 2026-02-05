import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PersistentTaskList from "../../src/components/PersistentTaskList";

describe("Exercise 4: localStorage Persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("renders an input and Add button", () => {
    render(<PersistentTaskList />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("adds a task and saves it to localStorage", async () => {
    const user = userEvent.setup();
    render(<PersistentTaskList />);

    await user.type(screen.getByRole("textbox"), "Persist me");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Persist me")).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0]).toHaveProperty("title", "Persist me");
  });

  it("loads tasks from localStorage on mount", async () => {
    // Pre-populate localStorage
    localStorage.setItem(
      "tasks",
      JSON.stringify([{ id: "1", title: "Pre-existing task" }])
    );

    render(<PersistentTaskList />);
    expect(screen.getByText("Pre-existing task")).toBeInTheDocument();
  });

  it("persists tasks across remounts", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<PersistentTaskList />);

    await user.type(screen.getByRole("textbox"), "Survive remount");
    await user.click(screen.getByRole("button", { name: /add/i }));

    unmount();

    // Remount
    render(<PersistentTaskList />);
    expect(screen.getByText("Survive remount")).toBeInTheDocument();
  });
});
