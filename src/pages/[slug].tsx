import { AppWrapper } from "@/components/AppWrapper"
import { EmailInput } from "@/components/EmailInput"
import { MenuProvider } from "@/components/Menu"
import { NavBar } from "@/components/NavBar"
import { TwoHalvesPage } from "@/components/TwoHalvesPage"
import { gql, GraphQuery, request, useGraphQuery } from "@/util/gql"
import { MarketingPageDocument, SiteLocale } from "@/__generated/graphql"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { StructuredText } from "react-datocms"

export const getStaticPaths: GetStaticPaths<Query> = async ({}) => ({
  paths: [],
  fallback: "blocking",
})

type Query = { slug: string }

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
  const graphQuery = await request(preview, MarketingPageDocument, {
    slug: params?.slug,
    locale: locale as SiteLocale,
  })

  if (!graphQuery.initialData.marketingPage)
    return { notFound: true, revalidate: 86400 }

  return { props: { graphQuery }, revalidate: 86400 }
}

type Props = { graphQuery: GraphQuery<typeof MarketingPageDocument> }

const MarketingPage: NextPage<Props> = ({ graphQuery }) => {
  const { data } = useGraphQuery(graphQuery)

  if (!data) return <p>No data</p>

  return (
    <AppWrapper seo={data.marketingPage?._seoMetaTags} site={data}>
      <MenuProvider value={data}>
        <style jsx>{`
          footer {
            margin-bottom: 1rem;
          }
        `}</style>

        <NavBar />
        <TwoHalvesPage
          name={data.marketingPage?.name!}
          image={data.marketingPage?.coverImage!}
          footer={
            <footer>
              <EmailInput data={data} dark />
            </footer>
          }
        >
          <StructuredText data={data.marketingPage?.content?.value} />
        </TwoHalvesPage>
      </MenuProvider>
    </AppWrapper>
  )
}

export default MarketingPage
