import { AppWrapper } from "@/components/AppWrapper"
import { EmailInput } from "@/components/EmailInput"
import { MenuProvider } from "@/components/Menu"
import { NavBar } from "@/components/NavBar"
import { TwoHalvesPage } from "@/components/TwoHalvesPage"
import { gql, request } from "@/util/gql"
import {
  GetMarketingPageDocument,
  GetMarketingPageQuery,
  SiteLocale,
} from "@/__generated/graphql"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { StructuredText } from "react-datocms"

type Query = { slug: string }

gql`
  query ListMarketingPages {
    allMarketingPages {
      slug
      _allContentLocales {
        locale
      }
    }
  }
`

export const getStaticPaths: GetStaticPaths<Query> = async ({ locales }) => {
  const response = await request(ListMarketingPagesDocument)

  const paths = response.allMarketingPages.flatMap((page) => {
    const slug = page.slug!

    return (
      page._allContentLocales
        ?.filter((contentLocale) => locales?.includes(contentLocale?.locale!))
        .map((locale) => ({
          locale: locale?.locale,
          params: { slug },
        })) ?? [{ params: { slug } }]
    )
  })

  return { paths, fallback: false }
}

gql`
  query GetMarketingPage($slug: String, $locale: SiteLocale) {
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
}) => {
  const response = await request(GetMarketingPageDocument, {
    slug: params?.slug,
    locale: locale as SiteLocale,
  })

  return { props: { response } }
}

type Props = { response: GetMarketingPageQuery }

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
