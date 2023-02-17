import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textXsRegular } from "@/design/typography";

export const Root = styled.div`
  ${textXsRegular};
  color: ${receiverTheme.colors.gray["400"]};
  letter-spacing: 0.03em;
  display: flex;
  height: 0.75rem;
  margin-left: auto;
`;
