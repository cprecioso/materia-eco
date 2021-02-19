import type { NextPage } from "next"
import Head from "next/head"

const IndexPage: NextPage = () => (
  <div className="wrapper">
    <Head>
      <title>materia.eco</title>
    </Head>

    <style jsx>{`
      :global(body) {
        background-color: rgb(250, 250, 250);
      }

      .wrapper {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;

        text-align: left;
        color: rgb(90, 90, 90);
        font-weight: bold;
        margin: 20vh 20vw 0;
      }

      a {
        color: inherit;
      }
    `}</style>
    <h1>
      Estamos
      <br />
      construyendo
      <br />
      materia.eco
    </h1>
    <p>
      <a href="mailto:hola@materia.eco">hola@materia.eco</a>
    </p>
  </div>
)

export default IndexPage
