import styles from "@/style/index.module.css"
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"

const IndexPage: NextPage = () => {
  const [email, setEmail] = useState("")

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
        </Head>

        <header>
          <h1 className={styles.title}>MATERIA</h1>
          <h2 className={styles.subtitle}>
            Construyendo una nueva forma de elegir materiales sostenibles
          </h2>
        </header>

        <div className={styles.content}>
        <main>
          <p>Síguenos para estar al día</p>

          <form
            className={styles.linkedForm}
            method="GET"
            action="https://docs.google.com/forms/d/e/1FAIpQLSeR73UTiDLt0fbzpJ5Ou-xErBkDAXYEWQ9oEhvm96F1RPCNDQ/viewform"
          >
            <input type="hidden" name="usp" value="pp_url" />
            <input
              aria-label="Email"
              type="email"
              autoComplete="email"
              name="entry.535197192"
              placeholder="Email"
              required
              className={styles.emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className={styles.sendButton}
              aria-label="Enviar"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>

          <ul className={styles.socialList}>
            <li>
              <a href="https://twitter.com/materia_eco" title="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/materia_eco" title="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
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
      <div className={styles.background}>
        <video
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
    </div>
  )
}

export default IndexPage
