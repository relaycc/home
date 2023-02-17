import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textXsRegular } from "@/design/typography";

export * as Time from "@/design/Time";
export * as MsgPreview from "@/design/MsgPreview";
export * as ENSName from "@/design/ENSName";
export * as Avatar from "@/components/Avatar";

export const Root = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #ffffff;
  margin-top: 1.125rem;
  width: 100%;
`;

export const FirstMsgContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 0.5rem;
  padding: 0 1rem;

  :hover {
    background-color: ${receiverTheme.colors.gray["100"]};
  }
`;

export const RestOfTheMessages = styled(FirstMsgContainer)`
  min-height: 1.25rem;
  border-top: 2px solid #ffffff;

  :hover {
    background-color: ${receiverTheme.colors.gray["100"]};
  }
`;

export const HoveredTimeContainer = styled.div`
  visibility: hidden;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  width: 2.5rem;

  ${RestOfTheMessages}:hover & {
    visibility: unset;
    display: flex;
  }
`;

export const XxsSizedTime = styled.div`
  ${textXsRegular};
  font-size: 0.5rem;
  color: ${receiverTheme.colors.gray["400"]};
`;

export const StatusIconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding-top: 2px;
`;

export const UserAndMessage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const NameAndDate = styled.div`
  display: flex;
  align-items: baseline;
  column-gap: 0.5rem;
`;

export const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
`;
