import { useMemo } from "react";
import { useRouter } from "next/router";
import { ROBOT_CARDS } from "@/lib/robot-cards";
import { ROBOT_MOBILE_CARDS } from "@/lib/robot-cards-mobile";

export const usePriorityRobotCards = (isMobile?: boolean) => {
  const router = useRouter();
  const CARDS = isMobile ? ROBOT_MOBILE_CARDS : ROBOT_CARDS;
  const firstRobotName = (() => {
    if (typeof router.query.robot !== "string") {
      return null;
    } else if (!Object.keys(CARDS).includes(router.query.robot)) {
      return null;
    } else {
      return router.query.robot;
    }
  })();
  return useMemo(() => {
    return Object.keys(CARDS)
      .map((key) => [key, key === firstRobotName ? -Infinity : Math.random()])
      .sort((a, b) => {
        if (a[1] < b[1]) {
          return -1;
        } else if (a[1] > b[1]) {
          return 1;
        } else {
          return 0;
        }
      })
      .map(([key]) => {
        return CARDS[key];
      });
  }, [firstRobotName]);
};
