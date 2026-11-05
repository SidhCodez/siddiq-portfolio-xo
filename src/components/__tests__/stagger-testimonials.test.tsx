import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

describe("StaggerTestimonials direction", () => {
  it("changes the centre card on both next and previous", () => {
    render(<StaggerTestimonials />);

    expect(
      screen.getByText(/searching for an engineer like Siddiq/)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Next testimonial"));
    expect(screen.getByText(/so simple and intuitive/)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Previous testimonial"));
    expect(
      screen.getByText(/searching for an engineer like Siddiq/)
    ).toBeInTheDocument();
  });

  it("changes card transforms on previous", () => {
    const { container } = render(<StaggerTestimonials />);
    const cards = Array.from(container.querySelectorAll<HTMLElement>("div[style*='translate(-50%']"));
    const before = cards.map((card) => card.style.transform);

    fireEvent.click(screen.getByLabelText("Previous testimonial"));

    const after = Array.from(container.querySelectorAll<HTMLElement>("div[style*='translate(-50%']")).map(
      (card) => card.style.transform
    );

    expect(after).not.toEqual(before);
  });
});
