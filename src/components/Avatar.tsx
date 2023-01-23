import React, { FunctionComponent, useRef, useMemo } from "react";
import { useInView } from "@/hooks/useInView";
import {
  AvatarLg,
  AvatarMd,
  AvatarXl,
  BlockieLg,
  BlockieMd,
  BlockieXl,
} from "@/design/Avatar";
import { useEnsAvatar } from "@/hooks/useEnsAvatar";

export interface AvatarProps {
  handle: string | null | undefined;
  onClick: () => unknown;
  size?: "md" | "lg" | "xl";
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  handle,
  onClick,
  size,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const ensAvatar = useEnsAvatar({ handle, wait: !isInView });

  const AvatarElement = useMemo(() => {
    switch (size) {
      case "md":
        return AvatarMd;
      case "lg":
        return AvatarLg;
      case "xl":
        return AvatarXl;
      default:
        throw new Error("Invalid Avatar size");
    }
  }, [size]);

  const blockie = useMemo(() => {
    switch (size) {
      case "md":
        return {
          component: BlockieMd,
          seed: handle || "no address",
          size: 10,
          scale: 4,
        };
      case "lg":
        return {
          component: BlockieLg,
          seed: handle || "no address",
          size: 10,
          scale: 5,
        };
      case "xl":
        return {
          component: BlockieXl,
          seed: handle || "no address",
          size: 10,
          scale: 7.5,
        };
      default:
        throw new Error("Invalid Avatar size");
    }
  }, [handle, size]);

  if (!ensAvatar.data) {
    return (
      <div
        ref={ref}
        onClick={onClick}
        style={{ opacity: ensAvatar.isLoading ? 0.2 : 1 }}
      >
        <blockie.component
          seed={blockie.seed}
          size={blockie.size}
          scale={blockie.scale}
        />
      </div>
    );
  } else {
    return (
      <AvatarElement
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0 }}
        onClick={onClick}
        src={ensAvatar.data}
        alt="user"
      />
    );
  }
};
