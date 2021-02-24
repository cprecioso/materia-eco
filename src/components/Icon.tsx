import { config } from "@fortawesome/fontawesome-svg-core"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"
import type { FunctionComponent } from "react"

config.autoAddCss = false

export const Icon: FunctionComponent<FontAwesomeIconProps> = (props) => (
  <FontAwesomeIcon width="1em" height="1em" {...props} />
)
