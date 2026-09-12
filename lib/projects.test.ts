import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects data", () => {
  it("has exactly 9 projects", () => {
    expect(projects).toHaveLength(9);
  });

  it("is in the spec-defined path order", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "fast-pos",
      "clickly",
      "mizan",
      "sanad",
      "ibi-learning-flows",
      "rakeb",
      "lawyertech",
      "abicerp",
      "xcrp",
    ]);
  });

  it("every project has non-empty name, description, and tech list", () => {
    for (const p of projects) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.tech.length).toBeGreaterThan(0);
    }
  });

  it("status is only Production or In Development", () => {
    for (const p of projects) {
      expect(["Production", "In Development"]).toContain(p.status);
    }
  });

  it("XCRP is the only In Development project and has no url", () => {
    const xcrp = projects.find((p) => p.slug === "xcrp")!;
    expect(xcrp.status).toBe("In Development");
    expect(xcrp.url).toBeUndefined();

    const others = projects.filter((p) => p.slug !== "xcrp");
    for (const p of others) {
      expect(p.status).toBe("Production");
    }
  });

  it("lawyertech has no url (Mizan and Sanad carry the live links instead)", () => {
    const lawyertech = projects.find((p) => p.slug === "lawyertech")!;
    expect(lawyertech.url).toBeUndefined();
  });

  it("known live projects have their confirmed urls", () => {
    const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
    expect(bySlug["rakeb"].url).toBe("https://rakeb.abicex.com");
    expect(bySlug["mizan"].url).toBe("https://mizan.lawyertech.sa");
    expect(bySlug["sanad"].url).toBe("https://sanad.lawyertech.sa");
    expect(bySlug["abicerp"].url).toBe("https://abicerp.com");
  });
});
