import { AppWrapper } from "@/components/AppWrapper"
import { EmailInput } from "@/components/EmailInput"
import { MenuProvider } from "@/components/Menu"
import { NavBar } from "@/components/NavBar"
import { TwoHalvesPage } from "@/components/TwoHalvesPage"
import { gql, request } from "@/util/gql"
import {
  MarketingPageDocument,
  MarketingPageQuery,
  SiteLocale,
} from "@/__generated/graphql"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { StructuredText } from "react-datocms"

type Query = { slug: string }

export const getStaticPaths: GetStaticPaths<Query> = async ({}) => ({
  paths: [],
  fallback: "blocking",
})

gql`
  query MarketingPage($slug: String, $locale: SiteLocale) {
    ...AppWrapper
    ...Menu
    ...EmailInput
    marketingPage(filter: { slug: { eq: $slug } }, locale: $locale) {
      _seoMetaTags {
        ...AppWrapperSeo
      }
      name
      coverImage {
        ...HalfImage
      }
      content {
        value
      }
    }
  }
`

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  locale,
  params,
  preview,
}) => {
  const response = await request(preview, MarketingPageDocument, {
    slug: params?.slug,
    locale: locale as SiteLocale,
  })

  if (!response.marketingPage) return { notFound: true, revalidate: 86400 }

  return { props: { response }, revalidate: 86400 }
}

type Props = { response: MarketingPageQuery }

const MarketingPage: NextPage<Props> = ({ response }) => (
  <AppWrapper seo={response.marketingPage?._seoMetaTags} site={response}>
    <MenuProvider value={response}>
      <style jsx>{`
        footer {
          margin-bottom: 1rem;
        }
      `}</style>

      <NavBar />
      <TwoHalvesPage
        name={response.marketingPage?.name!}
        image={response.marketingPage?.coverImage!}
        footer={
          <footer>
            <EmailInput data={response} dark />
          </footer>
        }
      >
        <StructuredText data={response.marketingPage?.content?.value} />
      </TwoHalvesPage>
    </MenuProvider>
  </AppWrapper>
)

export default MarketingPage
