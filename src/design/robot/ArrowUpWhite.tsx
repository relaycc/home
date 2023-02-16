import styled from "styled-components";
import { ComponentProps } from "react";

const Base = styled((props: ComponentProps<"svg">) => (
  <svg
    width="15"
    height="14"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.50033 12.1289V1.86719M7.50033 1.86719L1.66699 6.99804M7.50033 1.86719L13.3337 6.99804"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
))``;

export const ArrowUpWhite = styled(Base)``;
