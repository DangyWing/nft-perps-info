"use client";

import { ConnectKitButton } from "connectkit";
import type { Theme, Mode, CustomTheme } from "connectkit/build/types";

type ConnectKitButtonProps = {
  label?: string;
  showBalance?: boolean;
  showAvatar?: boolean;
  theme?: Theme;
  mode?: Mode;
  customTheme?: CustomTheme;
  onClick?: (open: () => void) => void;
};

export const ConnectButton = (props: ConnectKitButtonProps) => {
  return <ConnectKitButton {...props} />;
};
