import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PathSection } from "./PathSection";
import { projects } from "@/lib/projects";

describe("PathSection", () => {
  it("renders every project's name once, in data order", () => {
    render(<PathSection />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((h) => h.textContent)).toEqual(
      projects.map((p) => p.name)
    );
  });
});
