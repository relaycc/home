import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { ComponentProps } from "react";


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

const PinIcon = styled((props: ComponentProps<"svg">)=>(
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.75 7.75L7.75 4.75H16.25L15.25 7.75V10C18.25 11 18.25 14.25 18.25 14.25H5.75C5.75 14.25 5.75 11 8.75 10V7.75Z"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.5V19.25"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ))`
  cursor: pointer`;

export const Pinned = styled(PinIcon)`
  path {
    fill: ${receiverTheme.colors.gray["900"]};
  }
`;

export const Unpinned = styled(PinIcon)`
  `;


