import React from "react";
import { render, screen } from "@testing-library/react";

import { LinkNav } from "../../components/PostHeader/LinkNav";

describe("Header link share section list", () => {
  const link = "https://regex101.com";
  const text = "Você chora pra usar Regex, então acesse esse site maravilhoso!";
  const encodedLink = encodeURIComponent(link);
  const encodedText = encodeURIComponent(text);
  const encodedLinkWithText = encodeURIComponent(`${text} - ${link}`);

  it("Render list from link", () => {
    render(<LinkNav uri={link} text={text} />);

    const facebookLinkElement = screen.getByTitle(/facebook$/i);
    const twitterLinkElement = screen.getByTitle(/twitter$/i);
    const whatsappLinkElement = screen.getByTitle(/whatsapp$/i);
    // const uriLinkElement = screen.getByTitle(/link$/i);

    expect(facebookLinkElement).toHaveAttribute(
      "href",
      `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}&amp;src=sdkpreparse`
    );
    expect(twitterLinkElement).toHaveAttribute(
      "href",
      `https://twitter.com/share?url=${encodedLink}&text=${encodedText}`
    );
    expect(whatsappLinkElement).toHaveAttribute(
      "href",
      `https://api.whatsapp.com/send?text=${encodedLinkWithText}`
    );
  });
});
