import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../../src/hooks/useLocalStorage";

describe("Exercise 6: useLocalStorage Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("key", "hello"));
    expect(result.current[0]).toBe("hello");
  });

  it("returns the stored value when localStorage has data", () => {
    localStorage.setItem("key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("stored");
  });

  it("updates state and localStorage when setValue is called", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initial"));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(JSON.parse(localStorage.getItem("key")!)).toBe("updated");
  });

  it("works with objects", () => {
    const { result } = renderHook(() =>
      useLocalStorage("obj", { count: 0 })
    );

    act(() => {
      result.current[1]({ count: 5 });
    });

    expect(result.current[0]).toEqual({ count: 5 });
    expect(JSON.parse(localStorage.getItem("obj")!)).toEqual({ count: 5 });
  });

  it("works with arrays", () => {
    const { result } = renderHook(() => useLocalStorage<string[]>("arr", []));

    act(() => {
      result.current[1](["a", "b"]);
    });

    expect(result.current[0]).toEqual(["a", "b"]);
  });
});
