import { EmailInput } from "@/components/EmailInput"
import { MenuData, MenuDocument, MenuProvider } from "@/components/Menu"
import { NavBar } from "@/components/NavBar"
import { TwoHalvesPage } from "@/components/TwoHalvesPage"
import { gql, request } from "@/util/gql"
import {
  GetMarketingPageDocument,
  GetMarketingPageQuery,
  ListMarketingPagesDocument,
  SiteLocale,
} from "@/__generated/graphql"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { renderMetaTags, SeoMetaTagType, StructuredText } from "react-datocms"

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
    marketingPage(filter: { slug: { eq: $slug } }, locale: $locale) {
      name
      coverImage {
        ...HalfImage
      }
      content {
        value
      }
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
    mailingListForm(locale: $locale) {
      ...GetMailingListForm
    }
  }
`

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  locale,
  params,
}) => {
  const [response, menuData] = await Promise.all([
    request(GetMarketingPageDocument, {
      slug: params?.slug,
      locale: locale as SiteLocale,
    }),
    request(MenuDocument, { locale: locale as SiteLocale }),
  ])

  return { props: { response, menuData } }
}

type Props = { response: GetMarketingPageQuery; menuData: MenuData }

const MarketingPage: NextPage<Props> = ({ response, menuData }) => (
  <MenuProvider value={menuData}>
    <style jsx>{`
      footer {
        margin-bottom: 1rem;
      }
    `}</style>

    <Head>
      {response.marketingPage?._seoMetaTags
        ? renderMetaTags(
            response.marketingPage._seoMetaTags as SeoMetaTagType[]
          )
        : null}
    </Head>
    <NavBar />
    <TwoHalvesPage
      name={response.marketingPage?.name!}
      image={response.marketingPage?.coverImage!}
      footer={
        <footer>
          <EmailInput data={response.mailingListForm!} />
        </footer>
      }
    >
      <StructuredText data={response.marketingPage?.content?.value} />
    </TwoHalvesPage>
  </MenuProvider>
)

export default MarketingPage
