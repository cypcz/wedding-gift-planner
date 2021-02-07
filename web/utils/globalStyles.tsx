import { css, Global } from "@emotion/react";

export const globalStyles = (
  <Global
    styles={css`
      @font-face {
        font-family: "Corsiva";
        font-weight: 400;
        font-display: auto;
        src: url(/fonts/corsiva.ttf) format("truetype");
      }

      *,
      html,
      body {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .react-datepicker-wrapper {
        width: 100%;
      }

      .react-datepicker__input-container > input {
        width: inherit;
      }

      .Toastify__toast {
      }

      .Toastify__toast--success {
        background-color: white;
        color: #373232; /* input */
      }

      .Toastify__toast--error {
        background-color: white;
        color: #e15f5f; /* error */
      }
    `}
  />
);
