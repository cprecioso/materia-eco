import { gql } from "@/util/gql"
import {
  AppWrapperDataFragment,
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
  fragment AppWrapperData on Query {
    _site {
      faviconMetaTags {
        ...AppWrapperSeo
      }
    }
  }
`

export const AppWrapper: FunctionComponent<{
  seo?: AppWrapperSeoFragment[]
  site?: AppWrapperDataFragment
}> = ({ children, seo, site }) => (
  <>
    <Head>
      {renderMetaTags([
        ...(site?._site.faviconMetaTags ?? []),
        ...(seo ?? []),
      ] as SeoMetaTagType[])}
    </Head>
    {children}
  </>
)
