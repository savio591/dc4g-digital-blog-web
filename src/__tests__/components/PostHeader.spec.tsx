import { render, screen } from "@testing-library/react";
import { PostHeader } from "../../components/PostHeader";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "https://google.com",
      query: "",
      asPath: "",
    };
  },
}));

describe("Post Header", () => {
  const titleText =
    "Produção de grãos da safra 2020/21 deve alcançar 268,3 milhões de toneladas";
  const descriptionText =
    "Lorem ipsum dolor sit amet, coectetur adipiscing elit. Suspendisse varius enim in eros...";

  it("Renders header post without updated_at", async () => {
    render(
      <PostHeader
        title={titleText}
        description={descriptionText}
        createdAt="2021-06-14T00:00:00-03:00"
      />
    );

    const headerElement = screen.getByRole("banner");

    const titleElement = screen.getByRole("heading", { name: titleText });

    const descriptionElement = screen.getByRole("heading", {
      name: descriptionText,
    });

    const dateGroup = screen.getByRole("contentinfo");
    const dateParagraph = screen.getByText("Publicado:", {
      exact: false,
    });
    const createdAtText = screen.getByText("Jun 14, 2021");

    expect(headerElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(dateGroup).toContainElement(dateParagraph);
    expect(dateParagraph).toContainElement(createdAtText);
  });

  it("Renders header post with updated_at", async () => {
    render(
      <PostHeader
        title={titleText}
        description={descriptionText}
        createdAt="2021-06-14T00:00:00-03:00"
        updatedAt="2021-06-25T00:00:00-03:00"
      />
    );

    const headerElement = screen.getByRole("banner");

    const titleElement = screen.getByRole("heading", { name: titleText });

    const descriptionElement = screen.getByRole("heading", {
      name: descriptionText,
    });

    const dateGroup = screen.getByRole("contentinfo");
    const dateParagraph = screen.getByText(/^Publicado:| - Atualizado:/gm, {
      exact: true,
    });
    const createdAtText = screen.getByText("Jun 14, 2021");

    expect(headerElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(dateGroup).toContainElement(dateParagraph);
    expect(dateParagraph).toContainElement(createdAtText);
  });
});
