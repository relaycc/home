import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fetchEnsName } from "@/hooks/useEnsName";

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
  peerAddress: string;
  isMobile?: boolean;
}

export const Card: FunctionComponent<CardProps> = ({
  handleClick,
  icon,
  initialBgColor,
  animateBgColor,
  isMobile,
  peerAddress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [ensName, setEnsName] = useState("");
  const [textBlack, setTextBlack] = useState(false);

  const copiedIcon = React.cloneElement(icon, [
    { height: "82px", width: "82px" },
  ]);
  const name = useMemo(async () => {
    return await fetchEnsName(peerAddress).then((res) => {
      if (typeof res !== "string") return;
      const name = res.substring(0, res.indexOf("."));
      console.log(name);
      switch (name) {
        case "poap":
          setEnsName("POAP");
          return;
        case "ens":
          setEnsName("ENS");
          return;
        case "opensea":
          setEnsName("OpenSea");
          return;
        case "makerdao":
          setEnsName("MakerDAO");
          return;
        case "xmtp":
          setEnsName("XMTP");
          return;
        case "zksync":
          setEnsName("xkSync");
          return;
        case "walletconnect":
          setEnsName("WalletConnect");
          return;
        case "sushi":
          setEnsName("SushiSwap");
          return;
        case "lit":
          setTextBlack(true);
          break;
        case "gitcoin":
          setTextBlack(true);
          break;
        case "lens":
          setTextBlack(true);
          break;
        default:
          setEnsName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    });
  }, [peerAddress]);
  useEffect(() => console.log(name), [name]);

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
      transition={{
        duration: 0.4,
        delay: 0,
      }}
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
            black={textBlack}
          >
            Message the 🤖
            <br />
            for {ensName}
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

const Text = styled(motion.div)<{ black: boolean }>`
  position: absolute;
  bottom: 2rem;
  left: 124px;
  text-align: center;
  color: ${(p) =>
    p.black ? p.theme.colors.gray["900"] : p.theme.colors.gray["0"]};
  font-weight: 700;
`;
