import "@/style/_app.css"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-T9Y5DQLYNV"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-T9Y5DQLYNV",{storage:"none"});`,
        }}
      />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link
        rel="preload"
        href="https://use.typekit.net/dui6xjj.css"
        as="style"
      />
    </Head>

    <Component {...pageProps} />
  </>
)

export default App
