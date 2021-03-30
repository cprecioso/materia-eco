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
        padding: 0 2rem;
        box-sizing: border-box;
        max-width: 500px;
        width: 100%;
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
        margin-bottom: 0;
      }
    `}</style>

    <main className="content-half">
      <div className="content">
        <h1>{name}</h1>
        <>{children}</>
      </div>

      <div className="spacer" />
      {footer}
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
