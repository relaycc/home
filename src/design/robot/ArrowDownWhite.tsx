import styled from "styled-components";
import { ComponentProps } from "react";

const Base = styled((props: ComponentProps<"svg">) => (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.00033 1.4375V11.6992M7.00033 11.6992L12.8337 6.56835M7.00033 11.6992L1.16699 6.56835"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
))``;

export const ArrowDownWhite = styled(Base)``;
