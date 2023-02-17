import { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { truncateAddress } from "@/lib/truncateAddress";
import { Avatar } from "./Avatar";
import { textMdSemiBold } from "@/design/typography";
import { DropdownCard } from "@/design/relay/Nav";
import { DropdownItem } from "@/design/relay/DropdownItem";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { LogoutIcon } from "@/design/relay/LogoutIcon";
import { CopyIcon } from "@/design/relay/CopyIcon";
import { useRelayId } from "@/hooks/useRelayId";
import { truncateEns } from "@/lib/truncateEns";
import { ButtonPrimaryMd } from "@/design/robot/RobotButtonView";

const Button = styled(ButtonPrimaryMd)<{ minWidth: string }>`
  min-width: ${(props) => props.minWidth};
  ${textMdSemiBold}
`;

const NotConnected = ({ isMobile }: { isMobile: boolean }) => {
  const { openConnectModal } = useConnectModal();

  return (
    <Button
      minWidth={isMobile ? "100%" : "207px"}
      onClick={() => {
        if (openConnectModal === undefined) {
          throw new Error(
            "openConnectModal is undefined but isConnected is false"
          );
        } else {
          openConnectModal();
          return;
        }
      }}
    >
      Connect Wallet
    </Button>
  );
};

const Connected = ({
  onClick,
  isMobile,
}: {
  onClick: () => unknown;
  isMobile: boolean;
}) => {
  const { address } = useAccount();
  const relayId = useRelayId({ handle: address });
  return (
    <Button minWidth={isMobile ? "100%" : "207px"} onClick={onClick}>
      <Avatar handle={address} size="sm" onClick={() => null} />
      {typeof relayId.ens.data === "string" && truncateEns(relayId.ens.data)}
      {typeof relayId.ens.data === "string" ||
        truncateAddress(address || "", 8)}
    </Button>
  );
};

const Dropdown: FunctionComponent<{
  toggleDropdown: () => void;
  isMobile: boolean;
}> = ({ toggleDropdown, isMobile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const [copied, setCopied] = useCopyToClipboard();
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, toggleDropdown]);

  return (
    <WalletRoot ref={ref} isMobile={isMobile}>
      <Connected onClick={toggleDropdown} isMobile={isMobile} />
      {}
      <WalletCard isMobile={isMobile}>
        <DropdownItem
          onClick={() => {
            setCopied(address || "");
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
          }}
        >
          <CopyIcon style={{ marginRight: "0.5rem" }} />
          {showCopied ? "Copied!" : "Copy Address"}
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            if (disconnectAsync === undefined) {
              throw new Error(
                "disconnect is undefined but isConnected is true"
              );
            } else {
              disconnectAsync();
              return;
            }
          }}
        >
          <LogoutIcon style={{ marginRight: "0.5rem" }} />
          Disconnect
        </DropdownItem>
      </WalletCard>
    </WalletRoot>
  );
};

const WalletRoot = styled.div<{ isMobile: boolean }>`
  position: relative;
  width: ${(props) => (props.isMobile ? "100%" : "")};

  ${DropdownItem}:hover > ${LogoutIcon} {
    stroke: ${(p) => p.theme.colors.primary["500"]};
  }

  ${DropdownItem}:hover > ${CopyIcon} {
    stroke: ${(p) => p.theme.colors.primary["500"]};
  }
`;

const WalletCard = styled(DropdownCard)<{ isMobile: boolean }>`
  position: absolute;
  top: ${(props) => (props.isMobile ? "-105px" : "")};

  z-index: 1;
  width: ${(props) => (props.isMobile ? "100%" : "")};
`;

export const ConnectButton: FunctionComponent<{ isMobile?: boolean }> = ({
  isMobile,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      setShowDropdown(false);
    }
  }, [isConnected, setShowDropdown]);

  if (!isConnected) {
    return <NotConnected isMobile={!!isMobile} />;
  } else {
    if (!showDropdown) {
      return (
        <Connected
          onClick={() => setShowDropdown(true)}
          isMobile={!!isMobile}
        />
      );
    } else {
      return (
        <Dropdown
          toggleDropdown={() => setShowDropdown(false)}
          isMobile={!!isMobile}
        />
      );
    }
  }
};
