import { EmailInput } from "@/components/EmailInput"
import styles from "@/style/index.module.css"
import type { NextPage } from "next"
import Head from "next/head"

const IndexPage: NextPage = () => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.contentWrapper}>
        <Head>
          <title>MATERIA</title>
          <link
            rel="preload"
            href="https://use.typekit.net/dui6xjj.css"
            as="style"
          />
          <meta
            name="description"
            content="Construyendo una nueva forma de elegir materiales sostenibles"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <header>
          <h1 className={styles.title}>MATERIA</h1>
          <h2 className={styles.subtitle}>
            Construyendo una nueva forma de elegir materiales sostenibles
          </h2>
        </header>

        <div className={styles.content}>
          <main>
            <p>Apúntate para recibir novedades</p>

            <EmailInput />
          </main>

          <footer>
            <p>
              Escríbenos para más información
              <br />
              <a href="mailto:hola@materia.eco">hola@materia.eco</a>
            </p>
          </footer>
        </div>
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
        src="/static/splash.mp4"
        autoPlay
        loop
        disablePictureInPicture
        disableRemotePlayback
        muted
        playsInline
        controls={false}
      />
    </div>
  )
}

export default IndexPage
