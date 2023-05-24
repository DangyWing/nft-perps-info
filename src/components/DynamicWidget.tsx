"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react";
import { type ReactNode } from "react";

type Props = {
  buttonClassName?: string;
  buttonContainerClassName?: string;
  innerButtonComponent?: ReactNode;
  variant?: "modal" | "dropdown";
};

export const ConnectDynamicWidget = (props: Props) => {
  return <DynamicWidget {...props} />;
};
