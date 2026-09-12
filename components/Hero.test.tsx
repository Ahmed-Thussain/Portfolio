import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the name and tagline", () => {
    render(<Hero />);
    expect(screen.getByText("Ahmed Tarek")).toBeInTheDocument();
    expect(
      screen.getByText(/full-stack javascript & ai developer/i)
    ).toBeInTheDocument();
  });

  it("renders the avatar image", () => {
    render(<Hero />);
    expect(screen.getByAltText(/ahmed tarek/i)).toBeInTheDocument();
  });
});
