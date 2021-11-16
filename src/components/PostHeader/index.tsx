import { useRouter } from "next/router";
import { useMemo } from "react";
// import {} from "react-icons";

import { dateFormat } from "../../utils/dateFormat";
import { LinkNav } from "./LinkNav";

// import styles from "./postHeader.module.scss";

interface PostHeaderProps {
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

export function PostHeader({
  title,
  description,
  createdAt,
  updatedAt,
}: PostHeaderProps): JSX.Element {
  const router = useRouter();
  const uri = router.pathname;
  const createdAtFormatted = useMemo(() => dateFormat(createdAt), [createdAt]);
  const updatedAtFormatted = useMemo(() => dateFormat(updatedAt), [updatedAt]);

  return (
    <header>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <div>
        <div role="contentinfo">
          <p>
            Publicado:
            <time dateTime={createdAt}>{createdAtFormatted}</time>
            {updatedAt && "- Atualizado:"}
            {updatedAt && (
              <time dateTime={updatedAt}>{updatedAtFormatted}</time>
            )}
          </p>
        </div>
        <LinkNav uri={uri} text={title} />
      </div>
    </header>
  );
}
