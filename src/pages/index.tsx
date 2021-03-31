import { AppWrapper } from "@/components/AppWrapper"
import { EmailInput } from "@/components/EmailInput"
import { Menu, MenuProvider } from "@/components/Menu"
import styles from "@/style/index.module.css"
import { gql, GraphQuery, request, useGraphQuery } from "@/util/gql"
import { IndexPageDocument, SiteLocale } from "@/__generated/graphql"
import type { GetStaticProps, NextPage } from "next"
import { StructuredText } from "react-datocms"

gql`
  query IndexPage($locale: SiteLocale) {
    ...AppWrapper
    ...EmailInput
    ...Menu
    landingPage(locale: $locale) {
      _seoMetaTags {
        ...AppWrapperSeo
      }
      content {
        value
      }
      background {
        video {
          mp4Url
          streamingUrl
        }
        blurUpThumb
      }
    }
  }
`

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
  preview,
}) => {
  const graphQuery = await request(preview, IndexPageDocument, {
    locale: locale as SiteLocale,
  })
  return { props: { graphQuery }, revalidate: 86400 }
}

type Props = { graphQuery: GraphQuery<typeof IndexPageDocument> }

const IndexPage: NextPage<Props> = ({ graphQuery: query }) => {
  const { data } = useGraphQuery(query)

  if (!data) return <p>No data</p>

  return (
    <AppWrapper seo={data.landingPage?._seoMetaTags} site={data}>
      <MenuProvider value={data}>
        <div className={styles.outerWrapper}>
          <div className={styles.contentWrapper}>
            <header className={styles.landing}>
              <StructuredText data={data.landingPage?.content?.value} />
            </header>

            <div className={styles.content}>
              <Menu />
            </div>

            <EmailInput className={styles.emailInput} data={data} />
          </div>

          <div className={styles.emblems}>
            <a href="https://profiles.eco/materia?ref=tm" rel="noopener">
              <img
                alt=".eco profile for materia.eco"
                src="https://trust.profiles.eco/materia/eco-mark.svg?color=%234b4b4b"
              />
            </a>
          </div>

          <video
            className={styles.background}
            poster={data.landingPage?.background?.blurUpThumb!}
            autoPlay
            loop
            disablePictureInPicture
            disableRemotePlayback
            muted
            playsInline
            controls={false}
          >
            <source
              src={data.landingPage?.background?.video?.streamingUrl}
              type="application/x-mpegURL"
            />
            <source
              src={data.landingPage?.background?.video?.mp4Url!}
              type="video/mp4"
            />
          </video>
        </div>
      </MenuProvider>
    </AppWrapper>
  )
}

export default IndexPage
