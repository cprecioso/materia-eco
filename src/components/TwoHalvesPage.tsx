import { gql } from "@/util/gql"
import type { HalfImageFragment } from "@/__generated/graphql"
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
        background-repeat: no-repeat, no-repeat;
        background-size: cover, cover;
        position: fixed;

        left: 50vw;
        right: 100vw;
      }

      h1 {
        font-size: 6.25em;
        line-height: 1em;
        margin-bottom: 0;
      }
    `}</style>

    <style jsx>{`
      .image-half {
        background-image: url("${image?.url}"), url("${image?.blurUpThumb}");
        background-position: ${image.focalPoint?.x * 100}%
            ${image.focalPoint?.y * 100}%,
          ${image.focalPoint?.x * 100}% ${image.focalPoint?.y * 100}%;
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

    <div className="image-half" />
  </div>
)
