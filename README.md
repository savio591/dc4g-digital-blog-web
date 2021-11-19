# Teste DC4G - Gov Digital Blog

[![Unitary Tests](https://github.com/savio591/dc4g-digital-blog-web/actions/workflows/jest.yml/badge.svg)](https://github.com/savio591/dc4g-digital-blog-web/actions/workflows/jest.yml)
[![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
![Next JS](https://img.shields.io/badge/Next-black?logo=next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?logo=vercel&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?logo=SASS&logoColor=white)

O projeto consiste em criar uma página de blog dinâmica como proposta de colocação no mercado através de estágio por meio da [Dc4G Digital].

⚠️ **Caso pular estas notas, vá direto para configuração das [variáveis de ambiente](###)** ⚠️

# Sobre o desafio:
Okay, mas como é esse teste? A [Dc4G] mandou o [documento] sobre o desafio em completo. Em resumo, o candidato deve construir um blog com React e Typescript utilizando este [template].
A seguir, pontos importantes para o desenvolvimento do projeto:

## Objetivo-teste:
Eles não querem apenas ver se o código funciona, mas como e o por quê dele funcionar. Como a própria Dc4G anotou, o objetivo(e/ou teste) secundário da dc4g é:

* Avaliar como as habilidades que você pode adquirir em 7(sete) dias estudando sobre desenvolvimento frontend.
* Conhecer como o candidato escreve seus códigos e resolve os desafios do cotidiano front-end, como paginação e filtragem de conteúdo.

## Avaliação:
O que deve ser imprescindível e usado como checklist/métrica pessoal de desempenho.
### Pontos obrigatórios

* Qualidade do Código(O código é legível?)
* Implementação dos Fluxos do Template do Figma(Você implementou os
requisitos?)
* Cores e Design correspondentes(Você respeitou as regras do design?)
* Paginação(Conseguimos ver outras notícias?)
* Uso do versionamento com GIT(Você usou versionamento no seu projeto e
descreveu suas alterações?)
* Repositório privado com o projeto(Você salvou seu projeto em nuvem?)

### Pontos opcionais

* Filtro por Categoria
* Código pronto para produção
* Uso do Docker

# Do desenvolvimento do projeto:
Como eu planejei e organizei o projeto? A seguir, minhas anotações de concepção e coding.

## Cronograma
A se basear no prazo e em atividades passadas, segui o seguinte cronograma.

| Nome                                           | Descrição                                                                                                                                                      | Deadline                |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Planejamento e concepção                       | Deve ser descrito informações úteis e importantes para o desenvolvimento de peças gráficas e intelectuais(ex.: forma de refatoração, padrões de modularização) | 3º dia(14 de Nov. 2021) |
| Desenvolvimento 1                              | Inicialização do ambiente, testar api's.                                                                                                                       | 4º dia(16 de Nov. 2021) |
| Desenvolvimento 2                              | Desenvolver, ler documentações e testar o projeto, sempre a ser orientado por componentes e partes(de cima para baixo), respectivamente.                       | 6º dia(18 de Nov. 2021) |
| Correção de bugs e finalização de documentação | Resolver [issues] e preparar para entregar. Boa sorte!                                                                                                         | 7º dia(19 de Nov. 2021) |


### Notas sobre o coding:

Blog? React? É claro que vou usar com Next.js!

Caso não conheça, em resumo, para o nosso caso, ele renderiza as páginas do React de forma híbrida o que for possível para ser gerado de forma estática e menos dependência do javascript possível.

O que mais brilha meus olhos com Next é poder fazer um deploy com páginas dinâmicas/estáticas de forma simples, com qualidade de infraestrutura e, principalmente, é gratuito.

App é híbrido, mistura de SPA(Single Page Application), Static Page e Server Side-Rendering, ou seja, ISG(Incrimental Static Generator). Mas por quê? No projeto, o Next foi configurado para fazer as requisições da api através do lado do servidor Node/Vercel/Next e gerar um objeto(props para a routas SSG/React) para o Next criar uma página estática através do código em React. Assim, além das informações ficarem em html cruas, haverá a possibilidade de manipular estes dados com métodos do JavaScript e React.

Caso haja algum problema com a api, as páginas e imagens continuarão no servidor e tentará revalidar com a próxima requisição pelo lado client ou a cada 1 hora(se houver tráfego).

A forma de desenvolvimeno com Next é semelhante a com o Create-React-App, o que mudará é que o React Routes não é utilizado, porém, o Next Routes é fácil de entender.

Alguns testes unitários foram feitos. Mas por causa do tempo, optei por não continuar com os das rotas, api e das páginas.

### Padrões de desenvolvimento:

* Funções, classes, variáveis, comentários escritos em **Inglês**;
* **Hierarquia de arquivos:** a seguir o padrão comum entre desenvolvedores React/Next.JS(Acredito que para devs de outros ecossistemas que os padrões de código são autoexplicativas); Especialmente a [documentação ts] do Next.JS

### Configuração das variávies de ambiente

Acredito que não é preciso ensinar como abir em modo de desenvolvimento, deploy, produção, etc.

**As variáveis são essas:**

```bash
# <pastaraiz>/.local.env

NEXT_PUBLIC_HOSTNAME=localhost
NEXT_PUBLIC_PORT=3000
NEXT_PUBLIC_HOST=http://$NEXT_PUBLIC_HOSTNAME:$NEXT_PUBLIC_PORT

API_BASEURL= `URL DO BACKEND. EX: https://site.com/api`
API_POSTS_SECRET=`BEARER TOKEN DO BACKEND DOS POSTS`
API_HOSTNAME=`HOSTNAME DO BACKEND. EX: site.com`


```

---
Feito com 💜, [Savio Castelo], 2021.

[Dc4G Digital]: https://dc4g.digital "Looks like don't have an landing page about dc4g, d're black hat developers or just these are Macapaenses?"
[Dc4G]: https://google.com/search?q=DC4G "Dc4G Tecnologia LTDA - 41.047.670/0001-40"
[documento]: https://drive.google.com/file/d/1yUsWuftkZzZVB-eF335tj9nN7ClZtzD_/view "Está privado, né?"
[template]: https://www.figma.com/file/CenzYUn2ykDM2sRw7lMfkd/DC4G---master?node-id=0%3A1
[Savio Castelo]: https://savio591.github.io/ "Meu perfil pessoal"
[issues]: https://github.com/dc4g-digital-blog-web/issues
[projects]: https://github.com/savio591/dc4g-digital-blog-web/projects/1
[dev]: https://github.com/savio591/dc4g-digital-blog-web/tree/dev
