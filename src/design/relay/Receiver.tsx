import styled from "styled-components";
import { motion } from "framer-motion";
export { Logomark as Logo } from "@/design/relay/Logo";
export { ChevronDownActive as Chevron } from "@/design/relay/Chevron";

export const Fixed = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
`;

export const Fader = styled(motion.div)``;

export const FadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export const Launch = styled.button`
  width: 4rem;
  height: 4rem;
  background: #ffffff;
  box-shadow: 0px 0.874999px 2.625px rgba(16, 24, 40, 0.1),
    0px 0.874999px 1.75px rgba(16, 24, 40, 0.06);
  border: none;
  border-radius: 100%;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const Window = styled(motion.div)`
  position: fixed;
  overflow: hidden;
  right: 3rem;
  bottom: 8rem;
  padding: 0;
  box-shadow: 0px 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px;
`;

export const WindowAnimation = {
  initial: { width: 0, height: 0 },
  animate: { width: "400px", height: "700px" },
  transition: { duration: 0.3 },
  exit: { width: 0, height: 0 },
} as const;

export const Receiver = styled(motion.div)`
  width: 400px;
  height: 700px;
  border-radius: 14px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
