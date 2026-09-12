import "@testing-library/jest-dom/vitest";

// jsdom does not implement IntersectionObserver, which Framer Motion's
// whileInView / viewport features rely on. A minimal no-op stub is enough
// for component tests that only assert on rendered content, not on actual
// intersection timing.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

// @ts-expect-error - test-environment polyfill, not a spec-complete implementation
globalThis.IntersectionObserver = MockIntersectionObserver;
