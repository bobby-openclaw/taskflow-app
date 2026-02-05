import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskCard from "../../src/components/TaskCard";

describe("Exercise 1: TaskCard Component", () => {
  it("renders the task title as a heading", () => {
    render(<TaskCard title="Buy groceries" status="todo" priority="high" />);
    expect(
      screen.getByRole("heading", { name: /buy groceries/i })
    ).toBeInTheDocument();
  });

  it("displays the task status", () => {
    render(<TaskCard title="Test" status="in-progress" priority="low" />);
    expect(screen.getByText(/in-progress/i)).toBeInTheDocument();
  });

  it("displays the task priority", () => {
    render(<TaskCard title="Test" status="todo" priority="high" />);
    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });

  it("renders different tasks with different props", () => {
    const { rerender } = render(
      <TaskCard title="Task A" status="done" priority="low" />
    );
    expect(screen.getByRole("heading", { name: /task a/i })).toBeInTheDocument();

    rerender(<TaskCard title="Task B" status="todo" priority="medium" />);
    expect(screen.getByRole("heading", { name: /task b/i })).toBeInTheDocument();
    expect(screen.getByText(/medium/i)).toBeInTheDocument();
  });
});
