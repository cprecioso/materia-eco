import { GetMailingListFormFragment } from "@/__generated/graphql"
import type { FunctionComponent } from "react"
import { EmailInput } from "./EmailInput"

export const Footer: FunctionComponent<{
  data: GetMailingListFormFragment
}> = ({ data }) => (
  <footer>
    <style jsx>{`
      footer {
        position: absolute;
        bottom: 0;
        margin-bottom: 2rem;
      }
    `}</style>

    <EmailInput data={data} />
  </footer>
)
