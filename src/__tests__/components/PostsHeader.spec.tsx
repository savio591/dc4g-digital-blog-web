import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../../components/PostsHeader";

describe("Posts Header", () => {
  const title = "Últimas notícias";
  const noResultsText = "Nenhum resultado encontrado"

  it("Renders posts with some results", () => {
    const qtResults = 12;
    render(<Header title={title} results={qtResults} />);

    const titleHeading = screen.getByRole("heading", {
      name: title,
    });
    const resultsHeading = screen.getByRole("heading", {
      name: "12 resultados",
    });

    expect(titleHeading).toBeInTheDocument();
    expect(resultsHeading).toBeInTheDocument();
  });

  it("Renders posts with no results(null)", () => {
    const qtResults = null;
    render(<Header title={title} results={qtResults} />);

    const titleHeading = screen.getByRole("heading", {
      name: title,
    });
    const resultsHeading = screen.getByRole("heading", {
      name: noResultsText,
    });

    expect(titleHeading).toBeInTheDocument();
    expect(resultsHeading).toBeInTheDocument();
  });

  it("Renders posts with no results(undefined)", () => {
    const qtResults = undefined;
    render(<Header title={title} results={qtResults} />);

    const titleHeading = screen.getByRole("heading", {
      name: title,
    });
    const resultsHeading = screen.getByRole("heading", {
      name: noResultsText,
    });

    expect(titleHeading).toBeInTheDocument();
    expect(resultsHeading).toBeInTheDocument();
  });
});
