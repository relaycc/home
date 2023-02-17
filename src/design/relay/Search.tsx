import { useState, ComponentProps } from "react";
import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { Magnifier } from "@/design/Magnifier";
import { LoaderAnimGeneral } from "../LoaderAnimGeneral";

const Root = styled.div<{ isError?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin: 0 3rem;
  min-height: 40px;
  max-height: 40px;
  padding: 8px;
  gap: 10px;
  border-radius: 0.5rem;
  background: #ffffff;
  border: 1px solid #d0d5dd;
`;

export const ErrorRoot = styled(Root)`
  border: 1px solid ${(p) => p.theme.colors.error["500"]};
`;

const Input = styled.input<{ isError?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  background: #ffffff;
  color: ${(p) =>
    p.isError ? p.theme.colors.error["500"] : p.theme.colors.gray["900"]};
  opacity: ${(p) => (p.isError ? 0.5 : 1)};
  border: hidden;
  width: 100%;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${receiverTheme.colors.gray["400"]};
  }
`;

export const Message = (
  props: ComponentProps<typeof Input> & {
    isError?: boolean;
    isLoading?: boolean;
  }
) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <Root onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
      {active || <SearchMessage />}
      {props.isLoading && <LoaderAnimGeneral />}
      <Input {...props} />
    </Root>
  );
};

export const Search = (props: ComponentProps<typeof Input>) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <Root onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
      {active || <Magnifier />}
      <Input {...props} />
    </Root>
  );
};

const SearchMessage = styled((props: ComponentProps<"svg">) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.19647 16.2485C9.62684 17.5336 11.6865 18.0876 13.6669 18.0876C14.2026 18.0876 14.7441 18.047 15.2774 17.9624C15.5336 17.9218 15.795 17.9176 16.05 17.9655L19.2942 18.5738C19.9933 18.7048 20.6058 18.0923 20.4747 17.3932L20.2095 15.9788C20.1132 15.4652 20.2352 14.9411 20.4526 14.4658C20.8014 13.7035 21 12.8076 21 11.766C21 9.50431 20.0635 7.92944 18.6869 6.91724"
        stroke={receiverTheme.colors.gray["400"]}
        stroke-width="1.48147"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.88857 16.3251C14.1796 16.3251 18.7771 14.1796 18.7771 8.66255C18.7771 3.14551 14.1796 1 9.88857 1C5.59754 1 1 3.14551 1 8.66255C1 9.92509 1.24078 11.0111 1.66355 11.9351C1.92708 12.5112 2.0749 13.1464 1.95818 13.769L1.63672 15.4834C1.47783 16.3309 2.22021 17.0733 3.06768 16.9144L6.99995 16.1771C7.30905 16.1191 7.62597 16.1242 7.93652 16.1734C8.58287 16.2759 9.23928 16.3251 9.88857 16.3251Z"
        stroke={receiverTheme.colors.gray["400"]}
        stroke-width="1.48147"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.82464 8.66256C6.82464 9.00106 6.55019 9.27557 6.21164 9.27557C5.87309 9.27557 5.59863 9.00106 5.59863 8.66256C5.59863 8.32406 5.87309 8.04956 6.21164 8.04956C6.55019 8.04956 6.82464 8.32406 6.82464 8.66256Z"
        fill="white"
        stroke={receiverTheme.colors.gray["400"]}
        stroke-width="1.372"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5024 8.66256C10.5024 9.00106 10.2279 9.27557 9.88937 9.27557C9.55087 9.27557 9.27637 9.00106 9.27637 8.66256C9.27637 8.32406 9.55087 8.04956 9.88937 8.04956C10.2279 8.04956 10.5024 8.32406 10.5024 8.66256Z"
        fill="white"
        stroke={receiverTheme.colors.gray["400"]}
        stroke-width="1.372"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.1811 8.66256C14.1811 9.00106 13.9066 9.27557 13.5681 9.27557C13.2296 9.27557 12.9551 9.00106 12.9551 8.66256C12.9551 8.32406 13.2296 8.04956 13.5681 8.04956C13.9066 8.04956 14.1811 8.32406 14.1811 8.66256Z"
        fill="white"
        stroke={receiverTheme.colors.gray["400"]}
        stroke-width="1.372"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
})``;
