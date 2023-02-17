import styled from "styled-components";
import { ComponentProps } from "react";
import { receiverTheme } from "@/design/receiverTheme";

export const Ellipse = styled((props: ComponentProps<"svg">) => (
  <svg
    width="1367"
    height="938"
    viewBox="0 0 1367 938"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f_961_17625)">
      <ellipse
        cx="683.475"
        cy="469.05"
        rx="473.025"
        ry="258.3"
        fill="url(#paint0_linear_961_17625)"
        fill-opacity="0.6"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_961_17625"
        x="0.450211"
        y="0.750015"
        width="1366.05"
        height="936.602"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="105"
          result="effect1_foregroundBlur_961_17625"
        />
      </filter>
      <linearGradient
        id="paint0_linear_961_17625"
        x1="210.45"
        y1="210.75"
        x2="1156.5"
        y2="210.75"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#450E81" />
        <stop offset="0.0909091" stop-color="#430F84" />
        <stop offset="0.181818" stop-color="#3D128C" />
        <stop offset="0.272727" stop-color="#321798" />
        <stop offset="0.363636" stop-color="#231FA5" />
        <stop offset="0.454545" stop-color="#283FB3" />
        <stop offset="0.545455" stop-color="#3367C0" />
        <stop offset="0.636364" stop-color="#458EC6" />
        <stop offset="0.727273" stop-color="#5AAAC5" />
        <stop offset="0.818182" stop-color="#6BBBC6" />
        <stop offset="0.909091" stop-color="#75C5C7" />
        <stop offset="1" stop-color="#79C7C6" />
      </linearGradient>
    </defs>
  </svg>
))`
  background-color: ${receiverTheme.colors.primary["900"]};

  g:nth-child(3) {
    mix-blend-mode: overlay;
  }
`;
