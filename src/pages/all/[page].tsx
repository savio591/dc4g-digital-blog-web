import type { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { api as backendApi } from "../api/_lib/api";

import { ItemsList } from "../../components/ItemsList";
import { Pagination } from "../../components/Pagination";
import { PostsHeader } from "../../components/PostsHeader";

import { stringToNumber } from "../../utils/stringToNumber";
import { generateArrayWithNumbers } from "../../utils/generateArrayWithNumbers";

import styles from "../Home.module.scss";

type ResultsProps = {
  descricao_imagem: string;
  imagem_destaque_url: string;
  categoria_titulo: string;
  titulo: string;
  resumo: string;
  created_at: string;
  updated_at: string;
  slug: string;
}[];
interface HomePageProps {
  results: ResultsProps;
  count: number;
  total_pages: number;
}

type ResponseProps = HomePageProps;

const Home: NextPage<HomePageProps> = ({
  results = [] as ResultsProps,
  count,
  total_pages: totalPages,
}: HomePageProps) => {
  const resultsParsed = useMemo(() => {
    return results.map((item) => ({
      category: item.categoria_titulo,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      description: item.resumo,
      imageAlt: item.descricao_imagem,
      imageUrl: item.imagem_destaque_url,
      slug: item.slug,
      title: item.titulo,
    }));
  }, [results]);

  const router = useRouter();
  const { page: currentPageFromQuery } = router.query;

  const currentPage = useMemo(() => {
    const parsedPage = stringToNumber(currentPageFromQuery);

    if (parsedPage === 0) {
      return 1;
    }
    return parsedPage;
  }, [currentPageFromQuery]);    

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
      <PostsHeader title="Últimas notícias" results={count} />
      <main className={styles.main}>
        <ItemsList posts={resultsParsed} />
        <Pagination current={currentPage} total={totalPages} />
      </main>
    </div>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = async (): Promise<ResponseProps> => {
    const response = await backendApi.get("/noticias?publicado=true", {
      headers: {
        Authorization: process.env.API_POSTS_SECRET || "",
      },
    });
    return await response.data;
  };

  const pages = generateArrayWithNumbers((await response()).total_pages);

  const paths = pages.map((number) => {
    return { params: { page: number.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = context.params as { page: string };

  const response = async (): Promise<ResponseProps> => {
    const response = await backendApi.get(
      `/noticias?publicado=true&page=${page}`,
      {
        headers: {
          Authorization: process.env.API_POSTS_SECRET || "",
        },
      }
    );

    return response.data;
  };

  const { results, count, total_pages } = await response();

  return {
    props: {
      ok: true,
      results,
      count,
      total_pages,
    },
    revalidate: 60 * 60,
  };
};
