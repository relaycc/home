import React, { FunctionComponent, ReactNode, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export * from "./RobotIcons";

const Root = styled(motion.div)<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: ${(p) => (p.isMobile ? "156px" : "330px")};
  height: ${(p) => (p.isMobile ? "152px" : "330px")};
  cursor: pointer;
  background-color: grey;
  border-radius: ${(p) => (p.isMobile ? "8px" : "16px")};
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
  position: relative;
`;

interface CardProps {
  handleClick?: () => void;
  icon: ReactNode;
  initialBgColor: string;
  animateBgColor: string;
  isMobile?: boolean;
}

export const Card: FunctionComponent<CardProps> = ({
  handleClick,
  icon,
  initialBgColor,
  animateBgColor,
  isMobile,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const copiedIcon = React.cloneElement(icon, [
    { height: "82px", width: "82px" },
  ]);
  return (
    <Root
      onClick={handleClick}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      initial={{ backgroundColor: initialBgColor }}
      animate={
        isOpen
          ? {
              backgroundColor: initialBgColor,
            }
          : { backgroundColor: animateBgColor }
      }
      isMobile={isMobile}
    >
      {icon && icon}
      {/*<Icon />*/}
    </Root>
  );
};

const Wrapper = styled.div`
  height: 81px;
  width: 81px;
`;
