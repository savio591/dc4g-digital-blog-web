import { useMemo } from "react";
import styles from "./header.module.scss";

interface HeaderProps {
  title: string;
  results: number | undefined | null;
}

export function PostsHeader({ title, results }: HeaderProps): JSX.Element {
  const resultsHeaderFormatted = useMemo(() => {
    if (typeof results !== 'number' || results < 1) {
      return "Nenhum resultado encontrado";
    }
    return `${results} resultados`;
  }, [results]);

  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.divider} />
      <h2>{resultsHeaderFormatted}</h2>
    </header>
  );
}
