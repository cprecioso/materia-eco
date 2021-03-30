import { gql } from "@/util/gql"
import type { HalfImageFragment } from "@/__generated/graphql"
import Image from "next/image"
import type { FunctionComponent } from "react"

gql`
  fragment HalfImage on FileField {
    url
    blurUpThumb
    focalPoint {
      x
      y
    }
  }
`

export const TwoHalvesPage: FunctionComponent<{
  name: string
  image: HalfImageFragment
  footer?: JSX.Element
}> = ({ name, image, children, footer }) => (
  <div className="twohalves">
    <style jsx>{`
      .content-half,
      .image-half {
        top: 0vh;
        bottom: 100vh;
        min-height: 100vh;
        width: 50vw;
        box-sizing: border-box;
      }

      .content-half {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }

      .content {
        margin: 5em 0;
        margin-top: 8em;
        padding: 2rem;
        box-sizing: border-box;
        max-width: 500px;
        width: 95vw;

        background-color: white;
        border-radius: 3px;

        overflow: hidden;
      }

      .spacer {
        flex: auto 1 0;
      }

      .image-half {
        position: fixed;

        left: 50vw;
        right: 100vw;

        background-size: cover;
      }

      h1 {
        font-size: 6.25em;
        line-height: 1em;
        margin: 0;
      }

      @media screen and (max-width: 1000px) {
        .image-half {
          z-index: -1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: fixed;
          width: 100vw;
          height: 100vh;
        }

        .content-half {
          width: 100vw;
        }

        h1 {
          font-size: 2em;
        }

        .footer {
          background-color: white;
          width: 100vw;
        }

        .footer-inside {
          max-width: 90%;
          margin: 1rem auto;
        }
      }
    `}</style>

    <main className="content-half">
      <div className="content">
        <h1>{name}</h1>
        <>{children}</>
      </div>

      <div className="spacer" />
      <div className="footer">
        <div className="footer-inside">{footer}</div>
      </div>
    </main>

    <div
      className="image-half"
      style={{
        backgroundImage: `url("${image.blurUpThumb}")`,
        backgroundPosition: `${image.focalPoint?.x * 100}% ${
          image.focalPoint?.y * 100
        }%`,
      }}
    >
      <Image
        src={image.url}
        layout="fill"
        objectFit="cover"
        objectPosition={`${image.focalPoint?.x * 100}% ${
          image.focalPoint?.y * 100
        }%`}
        priority
        quality={100}
        loading="eager"
      />
    </div>
  </div>
)
