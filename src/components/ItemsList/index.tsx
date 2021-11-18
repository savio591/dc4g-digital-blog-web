import Image from "next/image";
import { useMemo } from "react";
import { dateFormat } from "../../utils/dateFormat";

import { MdEditCalendar } from "react-icons/md";

import styles from "./itemsList.module.scss";

export type ItemProps = {
  imageAlt: string;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
};

interface ItemsListProps {
  posts: ItemProps[] | undefined;
}

export function ItemsList({ posts }: ItemsListProps) {
  if (typeof posts !== "object" || posts.length <= 0) {
    return (
      <div className={styles.container} role="contentinfo">
        <p role="alert">
          <span>{"Nenhum item para mostrar :-("}</span>
        </p>
      </div>
    );
  }
  return (
    <ul className={styles.container}>
      {posts.map((post) => ItemBase({ ...post }))}
    </ul>
  );
}
export const ItemBase = ({
  imageUrl,
  imageAlt,
  category,
  title,
  description,
  createdAt,
  updatedAt,
  slug,
}: ItemProps): JSX.Element => {
  const createdAtFormatted = useMemo(() => dateFormat(createdAt), [createdAt]);
  const updatedAtFormatted = useMemo(() => dateFormat(updatedAt), [updatedAt]);

  return (
    <li key={slug} className={styles.card}>
      <div className={styles.imgDiv}>
        <Image src={imageUrl} layout="fill" alt={imageAlt} />
      </div>
      <section>
        <p className={styles.category}>{category}</p>
        <article>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>

        <p role="contentinfo">
          <MdEditCalendar size={24} className={styles.icon} />
          {"Publicado: "}
          <time dateTime={createdAt}>{createdAtFormatted}</time>
          {updatedAt && " - Atualizado: "}
          {updatedAt && <time dateTime={updatedAt}>{updatedAtFormatted}</time>}
        </p>
      </section>
    </li>
  );
};
