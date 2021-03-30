import type { FunctionComponent } from "react"

export const StyledBox: FunctionComponent = ({ children }) => (
  <div className="styled-box">
    <style jsx>{`
      .styled-box {
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(5px);
        border-radius: 3px;
        padding: 1em;
      }
    `}</style>
    <>{children}</>
  </div>
)

export const Button: FunctionComponent = ({ children }) => (
  <StyledBox>{children}</StyledBox>
)
