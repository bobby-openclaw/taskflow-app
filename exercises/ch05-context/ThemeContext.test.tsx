import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "../../src/context/ThemeContext";

// Test consumer component
function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe("Exercise 5: Theme Context", () => {
  it("provides 'light' as the default theme", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("toggles to 'dark' when toggleTheme is called", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("toggles back to 'light' on second toggle", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );

    const btn = screen.getByRole("button", { name: /toggle/i });
    await user.click(btn);
    await user.click(btn);
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("multiple consumers share the same theme state", async () => {
    const user = userEvent.setup();

    function SecondConsumer() {
      const { theme } = useTheme();
      return <span data-testid="theme2">{theme}</span>;
    }

    render(
      <ThemeProvider>
        <ThemeDisplay />
        <SecondConsumer />
      </ThemeProvider>
    );

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(screen.getByTestId("theme2")).toHaveTextContent("dark");
  });
});
