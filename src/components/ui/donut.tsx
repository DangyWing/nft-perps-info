import * as React from "react";
import type * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const Donut = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    ratio: number;
    colorOne?: string;
    colorTwo?: string;
    backgroundColor?: string;
  }
>(({ ratio, colorOne, colorTwo, backgroundColor, ...props }, ref) => {
  const css_string = ` ${colorOne ?? "#FF5722"} 0% ${ratio}%, ${
    colorTwo ?? "#2196F3"
  } ${ratio}% 100%`;

  const radialGradient = `radial-gradient(25px circle, ${
    backgroundColor ?? "white"
  } 50%, transparent calc(50% + 1px))`;

  const backgroundString = `${radialGradient}, conic-gradient(${css_string})`;

  return (
    <div ref={ref} className="p-2 text-center" {...props}>
      <div
        className="inline-block"
        style={{
          width: "40px",
          height: "40px",
          background: backgroundString,
          borderRadius: "50%",
        }}
      />
    </div>
  );
});
Donut.displayName = "Donut";
