import { gql } from "@/util/gql"
import {
  AppWrapperFragment,
  AppWrapperSeoFragment,
} from "@/__generated/graphql"
import Head from "next/head"
import type { FunctionComponent } from "react"
import { renderMetaTags, SeoMetaTagType } from "react-datocms"

gql`
  fragment AppWrapperSeo on Tag {
    attributes
    content
    tag
  }

  fragment AppWrapper on Query {
    appWrapperData: _site(locale: $locale) {
      faviconMetaTags(variants: [icon, appleTouchIcon, msApplication]) {
        attributes
        content
        tag
      }
    }
  }
`

export const AppWrapper: FunctionComponent<{
  seo?: AppWrapperSeoFragment[]
  site?: AppWrapperFragment
}> = ({ children, seo, site }) => (
  <>
    <Head>
      {renderMetaTags([
        ...(site?.appWrapperData.faviconMetaTags ?? []),
        ...(seo ?? []),
      ] as SeoMetaTagType[])}
    </Head>
    {children}
  </>
)
