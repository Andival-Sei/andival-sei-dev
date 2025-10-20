import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("рендерится с правильными классами", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("rounded-md");
    expect(skeleton).toHaveClass("bg-muted");
  });

  it("принимает дополнительные className", () => {
    const { container } = render(
      <Skeleton className="custom-class h-10 w-20" />
    );
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("custom-class");
    expect(skeleton).toHaveClass("h-10");
    expect(skeleton).toHaveClass("w-20");
  });

  it("передает дополнительные props", () => {
    const { container } = render(<Skeleton data-testid="skeleton-test" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveAttribute("data-testid", "skeleton-test");
  });
});
