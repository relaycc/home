import { ComponentProps } from "react";
import styled from "styled-components";

export const LoadingImg = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(
          90deg,
            #f1efef -24.18%,
          #f9f8f8 50.26%,
          #e7e5e5 114.84%
  );
  mix-blend-mode: multiply;
`;

export const LogoutIcon = styled((props: ComponentProps<"svg">) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="40" height="40" rx="20" fill="#DAD8F6" />
    <path
      d="M17 29H13C12.4696 29 11.9609 28.7893 11.5858 28.4142C11.2107 28.0391 11 27.5304 11 27V13C11 12.4696 11.2107 11.9609 11.5858 11.5858C11.9609 11.2107 12.4696 11 13 11H17M24 25L29 20M29 20L24 15M29 20H17"
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
      transition: fill 150ms ease-out;
      fill: #eaecf0;
    }
  }
  :active {
    rect {
      transition: fill 150ms ease-out;
      fill: #d0d5dd;
    }
  }
`;
