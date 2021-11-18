import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { arraysNumberGenerator, Pagination } from "../../components/Pagination";

jest.mock("next/router", () => ({
  useRouter() {
    let defaultsMethods = {
      route: "/",
      pathname: "https://google.com",
      query: "",
      asPath: "",
    };
    return {
      push: (link: string) => {
        defaultsMethods = {
          ...defaultsMethods,
          pathname: defaultsMethods.pathname + link,
        };
      },
      ...defaultsMethods,
    };
  },
}));

describe("Pagination", () => {
  it("Array button number generator - able to create 5 buttons", () => {
    const arrayWithNumbers = arraysNumberGenerator(5);

    expect(arrayWithNumbers).toHaveLength(5);
    expect(arrayWithNumbers).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("Should be able to render 5 pagination buttons", () => {
    render(<Pagination current={1} total={5} />);

    const buttonsList = screen.getAllByRole("button");
    expect(buttonsList).toHaveLength(6); /* Plus 'next page' button */
  });

  it("Should be able to click and change page", () => {
    const { rerender } = render(<Pagination current={1} total={5} />);

    const buttonsList = screen.getByText("2");
    expect(buttonsList).toBeInTheDocument();
    expect(buttonsList).toHaveAttribute("aria-current", "false");

    userEvent.click(buttonsList);
    expect(buttonsList).toHaveAttribute("aria-current", "true");

    rerender(<Pagination current={3} total={5} />);
    expect(buttonsList).toHaveAttribute("aria-current", "true");
  });

  it("Should be able to click on next page", () => {
    const { debug } = render(<Pagination current={1} total={5} />);

    const buttonsList = screen.getByText("2");
    expect(buttonsList).toHaveAttribute("aria-current", "false");

    const nextButton = screen.getByLabelText(/^next|próxim/iu); /* Bilíngual */
    userEvent.click(nextButton);
    debug();

    expect(buttonsList).toHaveAttribute("aria-current", "true");
  });

  it("Should not be able to click on previous page", () => {
    render(<Pagination current={2} total={4} />);

    const previousButton =
      screen.getByLabelText(/^prev|ante/iu); /* Bilíngual */
    userEvent.click(previousButton);

    expect(previousButton).not.toBeInTheDocument();
  });

  it("Should not be able to click on next page", () => {
    render(<Pagination current={3} total={4} />);

    const nextButton = screen.getByLabelText(/^next|próxim/iu); /* Bilíngual */
    userEvent.click(nextButton);

    expect(nextButton).not.toBeInTheDocument();
  });
});
