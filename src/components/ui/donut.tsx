import * as React from "react";

import { cn } from "~/utils/utils";

export const Donut = ({
  className,
  ratio,
  colorOne,
  colorTwo,
  backgroundColor,
}: {
  className?: string;
  ratio: number;
  colorOne?: string;
  colorTwo?: string;
  backgroundColor?: string;
}) => {
  const css_string = ` ${colorOne ?? "#FF5722"} 0% calc(${ratio}% + 1px), ${
    colorTwo ?? "#2196F3"
  } ${ratio}% 100%`;

  const radialGradient = `radial-gradient(25px circle, ${
    backgroundColor ?? "white"
  } 50%, transparent calc(50% + 1px))`;

  return (
    <div className={cn("", className)}>
      <div className="float-left inline-block p-2">
        <div
          className="inline-block"
          style={{
            width: "40px",
            height: "40px",
            background: `${radialGradient},
              conic-gradient(${css_string})`,
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
};
