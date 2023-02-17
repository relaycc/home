import styled from "styled-components";
import { motion } from "framer-motion";
import { ComponentProps } from "react";
import {
  ButtonPrimaryMd,
  ButtonSecondaryMd,
} from "@/design/robot/RobotButtonView";

export * from "@/design/relay/Logo";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0.5rem;
  display: flex;
  z-index: 2;
`;

export const Root = styled(motion.div)<{ height?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  background: ${(p) => p.theme.colors.gray["800"]};
  //background: #475467;
  border: 1px solid ${(p) => p.theme.colors.gray["600"]};
  border-radius: 8px;
  padding: 1rem;
  overflow-y: auto;
  height: ${(props) => (props.height ? `${props.height}px` : "")};
`;

export const Products = styled.h6`
  height: 22px;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #98a2b3;
  margin: 0;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
export const RightWrapper = styled.div`
  display: flex;
  max-width: 3.5rem;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;
export const SocialItem = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.gray["200"]};
  cursor: pointer;
  padding: 8px;
  height: 2.375rem;
`;

export const ConnectButton = styled.div`
  margin-top: auto;
  width: 100%;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 6rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
/* ***************************************************************************
 *
 * Prduct Buttons
 *
 * **************************************************************************/

export const ProductButton = styled(ButtonPrimaryMd)``;
export const TryRobotButton = styled(ButtonSecondaryMd)``;

export const MenuIcon = styled((props: ComponentProps<"svg">) => (
  <svg width="20" height="14" viewBox="0 0 20 14" {...props} cursor={"pointer"}>
    <path
      d="M1 7H15M1 1H19M1 13H19"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))`
  stroke: ${(p) => (p.stroke ? p.stroke : p.theme.colors.gray[900])};
`;
