import Link from "next/link";
import { FaExternalLinkAlt, FaFacebook, FaTwitter } from "react-icons/fa";

interface LinkNavProps {
  uri: string;
  text?: string;
}

export function LinkNav({ uri, text }: LinkNavProps) {
  const uriEncoded = encodeURIComponent(uri);
  const textEncoded = encodeURIComponent(text || "");
  const textWithLinkEncoded = encodeURIComponent(`${text} - ${uri}`);

  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${uriEncoded}&amp;src=sdkpreparse`;
  const twitterLink = `https://twitter.com/share?url=${uriEncoded}&text=${textEncoded}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${textWithLinkEncoded}`;

  return (
    <nav>
      <span>Compartilhe:</span>
      <ul>
        <li>
          <Link href={facebookLink}>
            <a title="Compartilhar post no Facebook">
              <FaFacebook />
            </a>
          </Link>
        </li>
        <li>
          <Link href={twitterLink}>
            <a title="Compartilhar post no Twitter">
              <FaTwitter />
            </a>
          </Link>
        </li>
        <li>
          <Link href={whatsappLink}>
            <a title="Compartilhar post no WhatsApp">
              <FaTwitter />
            </a>
          </Link>
        </li>
        <li>
          <Link href={uri}>
            <a title="Copiar link">
              <FaExternalLinkAlt />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
