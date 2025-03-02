// styles.js
import { Global, css } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    styles={css`
      @keyframes shine {
        from { left: -100%; }
        to { left: 100%; }
      }

      .shine-hover:hover::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: shine 1.5s;
      }
    `}
  />
)