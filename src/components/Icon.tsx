import type { IconDefinition } from "@fortawesome/fontawesome-common-types"
import type { FunctionComponent } from "react"

export const Icon: FunctionComponent<{
  icon: IconDefinition
  width?: string
  height?: string
}> = ({ icon, height = "1em", width = "1em" }) => {
  const [viewBoxWidth, viewBoxHeight, , , paths] = icon.icon

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={width}
      height={height}
    >
      {(typeof paths === "string" ? [paths] : paths).map((path, i) => (
        <path key={i} fill="currentColor" d={path} />
      ))}
    </svg>
  )
}
