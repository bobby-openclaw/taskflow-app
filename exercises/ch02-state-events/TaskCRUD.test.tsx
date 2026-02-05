import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "../../src/components/TaskList";

describe("Exercise 2: Task CRUD with State & Events", () => {
  it("renders an input and an Add button", () => {
    render(<TaskList />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("adds a task when typing and clicking Add", async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await user.type(screen.getByRole("textbox"), "Buy milk");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("clears the input after adding a task", async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Buy milk");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(input).toHaveValue("");
  });

  it("deletes a task when clicking Delete", async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await user.type(screen.getByRole("textbox"), "Delete me");
    await user.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText("Delete me")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /delete/i }));
    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });

  it("toggles a task complete with a checkbox", async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await user.type(screen.getByRole("textbox"), "Toggle me");
    await user.click(screen.getByRole("button", { name: /add/i }));

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    // Check for line-through style on the task text
    const taskText = screen.getByText("Toggle me");
    expect(taskText).toHaveStyle({ textDecoration: "line-through" });
  });
});
