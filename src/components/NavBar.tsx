import Link from "next/link"
import type { FunctionComponent } from "react"
import { Menu } from "./Menu"

export const NavBar: FunctionComponent<{ frosted?: boolean }> = ({
  frosted,
}) => (
  <header className={frosted ? "frosted" : ""}>
    <style jsx>{`
      header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        box-sizing: border-box;

        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        padding: 1rem 2rem;
      }

      .frosted {
        background-color: rgba(255, 255, 255, 30%);
        backdrop-filter: blur(8px);
      }

      h1 {
        font-family: "Alfarn", "Impact", sans-serif;
        font-weight: 400;
        font-size: 2.5em;
        margin: 0;

        color: #292828;
      }

      a {
        color: inherit;
        text-decoration: inherit;
      }
    `}</style>

    <Link href="/">
      <a>
        <h1>MATERIA</h1>
      </a>
    </Link>
    <Menu />
  </header>
)
