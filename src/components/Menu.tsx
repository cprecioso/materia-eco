import { gql } from "@/util/gql"
import { MenuFragment } from "@/__generated/graphql"
import Link from "next/link"
import { useRouter } from "next/router"
import { createContext, FunctionComponent, useContext } from "react"
import { Button } from "./Basic"

gql`
  fragment Menu on Query {
    menuData: allMarketingPages(locale: $locale) {
      slug
      name
    }
  }
`

const MenuDataContext = createContext<MenuFragment>({ menuData: [] })
MenuDataContext.displayName = "MenuData"

const Menu: FunctionComponent = () => {
  const router = useRouter()

  const data = useContext(MenuDataContext)
  const links = data?.menuData.filter(
    ({ slug }) => `/${slug}` !== router.asPath
  )

  return (
    <nav className="menu">
      <style jsx>{`
        .menu {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
        }

        .button {
          margin-left: 1em;
        }

        .button:first-of-type {
          margin-left: 0;
        }

        a {
          text-decoration: inherit;
          color: inherit;
        }
      `}</style>

      {links?.map(({ name, slug }) => (
        <div key={slug} className="button">
          <Link href={`/${slug}`}>
            <a>
              <Button>{name}</Button>
            </a>
          </Link>
        </div>
      ))}
    </nav>
  )
}
export { Menu }
export const MenuProvider = MenuDataContext.Provider
