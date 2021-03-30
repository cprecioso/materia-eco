import { AppWrapper } from "@/components/AppWrapper"
import { EmailInput } from "@/components/EmailInput"
import { Menu, MenuProvider } from "@/components/Menu"
import styles from "@/style/index.module.css"
import { gql, request } from "@/util/gql"
import {
  GetLandingPageDocument,
  GetLandingPageQuery,
  ListMenuDocument,
  ListMenuQuery,
  SiteLocale,
} from "@/__generated/graphql"
import type { GetStaticProps, NextPage } from "next"
import { StructuredText } from "react-datocms"

gql`
  query GetLandingPage($locale: SiteLocale) {
    ...AppWrapperData
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
    mailingListForm(locale: $locale) {
      ...GetMailingListForm
    }
  }
`

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const [data, menuData] = await Promise.all([
    request(GetLandingPageDocument, {
      locale: locale as SiteLocale,
    }),
    request(ListMenuDocument, { locale: locale as SiteLocale }),
  ])

  return { props: { data, menuData } }
}

type Props = {
  data: GetLandingPageQuery
  menuData: ListMenuQuery
}

const IndexPage: NextPage<Props> = ({ data, menuData }) => {
  return (
    <AppWrapper seo={data.landingPage?._seoMetaTags} site={data}>
      <MenuProvider value={menuData}>
        <div className={styles.outerWrapper}>
          <div className={styles.contentWrapper}>
            <header className={styles.landing}>
              <StructuredText data={data.landingPage?.content?.value} />
            </header>

            <div className={styles.content}>
              <Menu />
            </div>

            <EmailInput
              className={styles.emailInput}
              data={data.mailingListForm!}
            />
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
