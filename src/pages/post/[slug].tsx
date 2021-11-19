import type { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

import { api as backendApi } from "../api/_lib/api";

import { PostHeader } from "../../components/PostHeader";

import styles from "./Post.module.scss";

type ResultsProps = {
  descricao_imagem: string;
  imagem_destaque_url: string;
  categoria_titulo: string;
  categoria_slug: string;
  titulo: string;
  resumo: string;
  created_at: string;
  updated_at: string;
  conteudo: string;
}[];
interface PostPageProps {
  results: ResultsProps;
}

type ResponseProps = PostPageProps;

interface ResponsePathsProps {
  results: { slug: string; image_alt: string; image_url: string }[];
  total_pages: number;
}

const Post: NextPage<PostPageProps> = ({
  results = [] as ResultsProps,
}: PostPageProps) => {
  const {
    descricao_imagem: imageAlt,
    imagem_destaque_url: imageUrl,
    categoria_titulo: category,
    categoria_slug: categorySlug,
    created_at: createdAt,
    updated_at: updatedAt,
    resumo: description,
    titulo: title,
    conteudo: content,
  } = useMemo(() => results[0], [results]);

  return (
    <div>
      <Head>
        <title>Blog | Governo Digital</title>
        <meta
          name="description"
          content="Portal de notícias do Governo Digital."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostHeader
        {...{ createdAt, description, title, key: title, updatedAt }}
      />
      <main className={styles.main}>
        <div className={styles.imgDiv}>
          <Image src={imageUrl} layout="fill" alt={imageAlt} />
          <caption>{imageAlt}</caption>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} role="article" />
        <div role="note">
          <p>
            Categoria:{" "}
            <Link href="/">
              <a>Arquitetura</a>
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Post;

// Pré-renderiza todos os posts - SERVER-SIDE
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await backendApi.get<{
    results: { slug: string }[];
    total_pages: number;
  }>("/noticias?publicado=true", {
    headers: {
      Authorization: process.env.API_POSTS_SECRET || "",
    },
  });

  const resultsWithresultsFromOtherPages = [...data.results];

  if (data.total_pages > 1) {
    for (let i = 2; i <= data.total_pages; i++) {
      const { data: dataFromLoop } = await backendApi.get<ResponsePathsProps>(
        `/noticias?publicado=true&page=${i}`,
        {
          headers: {
            Authorization: process.env.API_POSTS_SECRET || "",
          },
        }
      );
      dataFromLoop.results.forEach((result) => {
        if (!result?.image_alt ?? !result?.image_url) {
          return;
        }
        resultsWithresultsFromOtherPages.push(result);
      });
    }
  }

  const slugs = resultsWithresultsFromOtherPages.map((post) => post.slug);

  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

// SERVER-SIDE
// Renderiza um .JSON para gerar a página estática
// O Next.JS revalida e verifica posts novos e re-renderiza todas as páginas a cada hora(sendo configurável a qualquer momento);
// Se na revalidação o backend estiver com problemas, os dados anteriores continuam funcionando.
// A revalidação só acontece enquanto quando for feito os requests dentro do intervalo.
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const { data } = await backendApi.get<ResponseProps>(
    `/noticias?slug=${slug}`,
    {
      headers: {
        Authorization: process.env.API_POSTS_SECRET || "",
      },
    }
  );

  return {
    props: {
      ok: true,
      results: data.results,
    },
    revalidate: 60 * 60,
  };
};

export const config = { amp: "hibrid" };
