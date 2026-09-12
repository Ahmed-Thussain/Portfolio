import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/projects";

const withUrl: Project = {
  slug: "demo",
  name: "Demo Project",
  category: "Demo Category",
  description: "A demo description.",
  tech: ["React", "Node.js"],
  contribution: "Built from the ground up.",
  status: "Production",
  url: "https://example.com",
};

const withoutUrl: Project = { ...withUrl, slug: "demo-2", url: undefined };

describe("ProjectCard", () => {
  it("renders the name, category, description, and tech tags", () => {
    render(<ProjectCard project={withUrl} />);
    expect(screen.getByText("Demo Project")).toBeInTheDocument();
    expect(screen.getByText("Demo Category")).toBeInTheDocument();
    expect(screen.getByText("A demo description.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders a Visit link when a url is present", () => {
    render(<ProjectCard project={withUrl} />);
    const link = screen.getByRole("link", { name: /visit/i });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders no Visit link when url is absent", () => {
    render(<ProjectCard project={withoutUrl} />);
    expect(screen.queryByRole("link", { name: /visit/i })).toBeNull();
  });

  it("shows the status badge", () => {
    render(<ProjectCard project={withUrl} />);
    expect(screen.getByText("Production")).toBeInTheDocument();
  });
});
