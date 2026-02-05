import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StatusBadge from "../../src/components/StatusBadge";
import TaskItem from "../../src/components/TaskItem";
import TaskListComposed from "../../src/components/TaskListComposed";

describe("Exercise 3: Component Composition", () => {
  describe("StatusBadge", () => {
    it("renders the status text", () => {
      render(<StatusBadge status="in-progress" />);
      expect(screen.getByText(/in-progress/i)).toBeInTheDocument();
    });
  });

  describe("TaskItem", () => {
    it("renders the task title and status badge", () => {
      render(<TaskItem title="Write tests" status="todo" onDelete={() => {}} />);
      expect(screen.getByText("Write tests")).toBeInTheDocument();
      expect(screen.getByText(/todo/i)).toBeInTheDocument();
    });

    it("calls onDelete when the Delete button is clicked", async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();
      render(<TaskItem title="Test" status="todo" onDelete={handleDelete} />);

      await user.click(screen.getByRole("button", { name: /delete/i }));
      expect(handleDelete).toHaveBeenCalledOnce();
    });
  });

  describe("TaskListComposed", () => {
    const tasks = [
      { id: "1", title: "Task A", status: "todo" },
      { id: "2", title: "Task B", status: "done" },
    ];

    it("renders all tasks", () => {
      render(<TaskListComposed tasks={tasks} onDeleteTask={() => {}} />);
      expect(screen.getByText("Task A")).toBeInTheDocument();
      expect(screen.getByText("Task B")).toBeInTheDocument();
    });

    it("calls onDeleteTask with the task id when deleting", async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();
      render(<TaskListComposed tasks={tasks} onDeleteTask={handleDelete} />);

      const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
      await user.click(deleteButtons[0]);
      expect(handleDelete).toHaveBeenCalledWith("1");
    });
  });
});
