import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../_lib/api";

export default async function all(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    try {
      const response = await api.get("/noticias?publicado=true", {
        headers: {
          Authorization: "Api-Key z3QazK8p.KVEhWR0A9GvpCUF70KsCqrKC9ROmLjWL",
        },
      });

      const results = response.data;

      res.status(200).json(results);
      return;
    } catch (err) {
      res
        .status(500)
        .send(
          "Erro 500 - Houve um erro no servidor, mas já estamos cuidando disso. Até breve! :-)"
        );
      return;
    }
  }

  res.status(405).send("Erro 405 - Método não permitido");
}
