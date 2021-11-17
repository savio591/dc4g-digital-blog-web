import React from "react";
import { render, screen } from "@testing-library/react";

import { ItemProps, ItemsList } from "../../components/ItemsList";

describe("Items list", () => {
  it("Renders posts", () => {
    const mockPosts: ItemProps[] = [
      {
        category: "Agricultura",
        createdAt: "2021-04-13T14:14:55.478039+00:00",
        updatedAt: "2021-07-29T18:41:57.368902+00:00",
        title:
          "Produção de grãos da safra 2020/21 deve alcançar um monte de coisa, isto é um teste de limite de caracteres",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus sit eleifend nibh vestibulum. Sed nunc sit odio ultrices enim mollis a. At placerat sed id egestas et odio proin. Lorem amet nunc egestas mattis.",
        imageAlt: "Plantação de alguma planta",
        imageUrl:
          "https://newnoticias.digital-gov.com/uploads/midias/d22755169e974e889bf455b70302d0ea.jpg",
        slug: "producao-de-safra",
      },
      {
        category: "Agricultura",
        createdAt: "2021-04-16T14:14:55.478039+00:00",
        updatedAt: "2021-07-25T18:41:57.368902+00:00",
        title:
          "Produção de grãos da safra 2020/21 deve alcançar um monte de coisa, isto é um teste de limite de caracteres",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus sit eleifend nibh vestibulum. Sed nunc sit odio ultrices enim mollis a. At placerat sed id egestas et odio proin. Lorem amet nunc egestas mattis.",
        imageAlt: "Plantação de alguma planta",
        imageUrl:
          "https://newnoticias.digital-gov.com/uploads/midias/d22755169e974e889bf455b70302d0ea.jpg",
        slug: "producao-de-safra2",
      },
    ];
    render(<ItemsList posts={mockPosts} />);

    const listitemElement = screen.getAllByRole("listitem");
    const imagesElement = screen.getAllByRole("img");
    const createdAtText = screen.getByText("Abr 13, 2021");
    const updatedAtText = screen.getByText("Jul 29, 2021");

    expect(listitemElement).toHaveLength(2); /* <body> is also an "listitem" */
    expect(imagesElement[0]).toHaveAccessibleName(mockPosts[0].imageAlt);
    expect(createdAtText).toBeInTheDocument();
    expect(updatedAtText).toBeInTheDocument();
  });

  it("Show no posts message", () => {
    render(<ItemsList posts={[]} />);

    screen.getByText("Nenhum item para mostrar :-(");
  });

  it("Show no posts message(undefined)", () => {
    render(<ItemsList posts={undefined} />);

    screen.getByText("Nenhum item para mostrar :-(");
  });
});
