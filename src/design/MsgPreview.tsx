import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textMdRegular } from "@/design/typography";

export const MsgContainer = styled.div`
  ${textMdRegular};
  color: ${receiverTheme.colors.gray["900"]};
  max-width: 19rem;
  overflow-wrap: anywhere;
`;

export const MsgLoading = styled.div`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  border-radius: 6px;
  height: 1rem;

  width: 14rem;
`;
