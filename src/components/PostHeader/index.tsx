import { useRouter } from "next/router";
import { useMemo } from "react";

import { dateFormat } from "../../utils/dateFormat";
import { LinkNav } from "./LinkNav";

import styles from "./PostHeader.module.scss";

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
  const uri = `${
    (process.env.NEXT_PUBLIC_HOST ??
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) + router.asPath
  }`;
  const createdAtFormatted = useMemo(() => dateFormat(createdAt), [createdAt]);
  const updatedAtFormatted = useMemo(() => dateFormat(updatedAt), [updatedAt]);

  return (
    <header className={styles.container}>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <div>
        <div role="contentinfo">
          <p>
            Publicado: <time dateTime={createdAt}>{createdAtFormatted}</time>
            {updatedAt && " - Atualizado: "}
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
