import React, { type SVGProps } from "react";

export function LoadingBlocks({
  width = 24,
  height = 24,
  dur = "0.2s",
  color,
}: SVGProps<SVGElement>): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" rx="1" width="10" height="10">
        <animate
          id="a"
          begin="0;k.end"
          attributeName="x"
          dur={dur}
          values="1;13"
          fill="freeze"
        />
        <animate
          id="d"
          begin="b.end"
          attributeName="y"
          dur={dur}
          values="1;13"
          fill="freeze"
        />
        <animate
          id="g"
          begin="e.end"
          attributeName="x"
          dur={dur}
          values="13;1"
          fill="freeze"
        />
        <animate
          id="j"
          begin="h.end"
          attributeName="y"
          dur={dur}
          values="13;1"
          fill="freeze"
        />
      </rect>
      <rect x="1" y="13" rx="1" width="10" height="10">
        <animate
          id="b"
          begin="a.end"
          attributeName="y"
          dur={dur}
          values="13;1"
          fill="freeze"
        />
        <animate
          id="e"
          begin="d.end"
          attributeName="x"
          dur={dur}
          values="1;13"
          fill="freeze"
        />
        <animate
          id="h"
          begin="g.end"
          attributeName="y"
          dur={dur}
          values="1;13"
          fill="freeze"
        />
        <animate
          id="k"
          begin="j.end"
          attributeName="x"
          dur={dur}
          values="13;1"
          fill="freeze"
        />
      </rect>
    </svg>
  );
}
