import React, { FunctionComponent, ReactNode, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

export * from "./RobotIcons";

const Root = styled(motion.div)<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: ${(p) => (p.isMobile ? "156px" : "330px")};
  height: ${(p) => (p.isMobile ? "152px" : "330px")};
  cursor: pointer;
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
      initial={{
        background: `radial-gradient(circle at center,${initialBgColor} 0%,${initialBgColor} 50%,${animateBgColor} 51%)`,
      }}
      animate={
        !isOpen
          ? {
              background: `radial-gradient(circle at center,${initialBgColor} 0%,${initialBgColor} 50%,${animateBgColor} 51%)`,
            }
          : {
              background: `radial-gradient(circle at center,${initialBgColor} 0%,${initialBgColor} 99%,${animateBgColor} 100%)`,
            }
      }
      isMobile={isMobile}
    >
      {icon && (
        <Wrapper>
          <IconWrapper
            initial={{ top: "72px" }}
            animate={
              isOpen
                ? {
                    top: "46px",
                  }
                : { top: "72px" }
            }
          >
            {icon}
          </IconWrapper>
          <Text
            initial={{ opacity: "0%" }}
            animate={
              isOpen
                ? {
                    opacity: "100%",
                  }
                : { opacity: "0%" }
            }
          >
            Message the
            <Image
              src={"/robot.jpeg"}
              alt={"robotHead"}
              width={16}
              height={16}
            />
            <br />
            for Alchemy
          </Text>
        </Wrapper>
      )}
      {/*<Icon />*/}
    </Root>
  );
};

const IconWrapper = styled(motion.div)`
  position: relative;
`;
const Wrapper = styled.div`
  height: 100%;
`;

const Text = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 124px;
  text-align: center;
`;
