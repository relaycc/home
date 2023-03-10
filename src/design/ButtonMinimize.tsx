import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { ComponentProps } from "react";



export const ButtonMinimize = styled((props: ComponentProps<"svg">) => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="20" fill="white" />
      <path
        d="M13 20H27"
        stroke="#101828"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ))`
  cursor: pointer;
  :hover {
    rect {
      fill: ${receiverTheme.colors.gray["200"]};
    }
  }

  :active {
    rect {
      fill: ${receiverTheme.colors.gray["300"]};
    }
  }`;
