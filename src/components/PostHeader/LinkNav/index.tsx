import Link from "next/link";
import { FaFacebookSquare, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdLink } from "react-icons/md";

import styles from "./LinkNav.module.scss";

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

  function handleShareButton() {
    navigator.clipboard.writeText(uri);
  }

  return (
    <nav className={styles.container}>
      <span>Compartilhe: </span>
      <ul>
        <li>
          <Link href={facebookLink}>
            <a title="Compartilhar post no Facebook" target='_blank'>
              <FaFacebookSquare size={24} />
            </a>
          </Link>
        </li>
        <li>
          <Link href={twitterLink}>
            <a title="Compartilhar post no Twitter" target='_blank'>
              <FaTwitter size={24} />
            </a>
          </Link>
        </li>
        <li>
          <Link href={whatsappLink}>
            <a title="Compartilhar post no WhatsApp" target='_blank'>
              <FaWhatsapp size={24} />
            </a>
          </Link>
        </li>
        <li>
          <Link href={uri}>
            <a
              title="Copiar link"
              target='_blank'
              onClick={(event) => {
                event.preventDefault();
                handleShareButton();
              }}
            >
              <MdLink size={24} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
