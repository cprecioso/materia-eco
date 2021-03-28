import styles from "@/style/form.module.css"
import { gql } from "@/util/gql"
import { GetMailingListFormFragment } from "@/__generated/graphql"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FunctionComponent } from "react"
import { Icon } from "./Icon"

gql`
  fragment GetMailingListForm on MailingListFormRecord {
    namePlaceholder
    emailPlaceholder
    companyPlaceholder
    callToAction
    areaOptions
  }
`

export const EmailInput: FunctionComponent<{
  data: GetMailingListFormFragment
  className?: string
}> = ({ data, className }) => (
  <div className={className}>
    <p className={styles.cta}>
      <b>{data.callToAction}</b>
    </p>
    <div className={styles.form}>
      <form
        action={
          "https://eco.us1.list-manage.com/subscribe/post?u=0b1ee51fdde538edaaf6b287a&id=4a594651c3"
        }
        method="post"
        className={styles.formContent}
      >
        <div className={styles.mainInput}>
          <input
            type="email"
            name="EMAIL"
            placeholder={data.emailPlaceholder!}
            required
            aria-label={data.emailPlaceholder!}
            autoComplete="email"
            className={styles.input}
            tabIndex={1}
          />
          <div className={styles.out} aria-hidden="true">
            <input
              type="text"
              name="b_0b1ee51fdde538edaaf6b287a_4a594651c3"
              tabIndex={-1}
            />
          </div>

          <button type="submit" className={styles.button} tabIndex={8}>
            <Icon icon={faPaperPlane} />
          </button>
        </div>

        <div className={styles.preHidden}>
          <div className={styles.preHiddenContent}>
            <input
              className={styles.input}
              type="text"
              name="NAME"
              placeholder={data.namePlaceholder!}
              autoComplete="name"
              aria-label={data.namePlaceholder!}
              tabIndex={2}
            />
            <input
              className={styles.input}
              type="text"
              name="COMPANY"
              placeholder={data.companyPlaceholder!}
              autoComplete="organization"
              aria-label={data.companyPlaceholder!}
              tabIndex={3}
            />
            <ul className={styles.list}>
              {data.areaOptions?.split("|").map((option, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      value={2 ** i}
                      name={`group[376474][${2 ** i}]`}
                      tabIndex={i + 4}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
)
