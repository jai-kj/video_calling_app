"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface IUseNavigationEventProps {
  onPathChange: () => void;
}

export const useNavigationEvent = ({
  onPathChange,
}: IUseNavigationEventProps) => {
  const pathname = usePathname();
  let effectCount = 0;

  useEffect(() => {
    return () => {
      if (effectCount++ >= 1) {
        onPathChange();
      }
    };
  }, [pathname, onPathChange, effectCount]);
};
