import styles from "@/style/form.module.css"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FunctionComponent } from "react"
import { Icon } from "./Icon"

export const EmailInput: FunctionComponent = () => {
  return (
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
            placeholder="Email"
            required
            aria-label="Email"
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

          <button
            type="submit"
            className={styles.button}
            aria-label="Enviar"
            tabIndex={8}
          >
            <Icon icon={faPaperPlane} />
          </button>
        </div>

        <div className={styles.preHidden}>
          <div className={styles.preHiddenContent}>
            <input
              className={styles.input}
              type="text"
              name="NAME"
              placeholder="Nombre (opcional)"
              autoComplete="name"
              aria-label="Nombre (opcional)"
              tabIndex={2}
            />
            <input
              className={styles.input}
              type="text"
              name="COMPANY"
              placeholder="Empresa (opcional)"
              autoComplete="organization"
              aria-label="Empresa (opcional)"
              tabIndex={3}
            />
            <ul className={styles.list}>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value={1}
                    name="group[376474][1]"
                    tabIndex={4}
                  />
                  Arquitectura
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value={2}
                    name="group[376474][2]"
                    tabIndex={5}
                  />
                  Interiorismo
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value={4}
                    name="group[376474][4]"
                    tabIndex={6}
                  />
                  Materiales
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value={8}
                    name="group[376474][8]"
                    tabIndex={7}
                  />
                  Construcción
                </label>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  )
}
