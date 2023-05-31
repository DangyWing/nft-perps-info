import * as React from "react";
import { type SliderProps } from "@radix-ui/react-slider";

import { Slider } from "~/components/ui/slider";
import { Input } from "../../../ui/input";
import { type ControllerRenderProps } from "react-hook-form";

interface WethSelectorProps {
  defaultValue: SliderProps["defaultValue"];
  wethBalance: number;
  field: ControllerRenderProps<
    {
      weth: number | string;
      leverage: number;
      slippage: number;
    },
    "weth"
  >;
  handleSliderChange: (value: number[]) => void;
  handleInputChange: (value: string) => void;
  textValue: string | undefined;
  sliderValue: number[] | undefined;
  wethValue: number[] | undefined;
  defaultSliderToChangeValue: number;
}

export function WethSelector({
  defaultValue,
  wethBalance,
  field,
  handleInputChange,
  handleSliderChange,
  textValue,
  wethValue,
  sliderValue,
}: WethSelectorProps) {
  return (
    <div className="grid gap-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Input
            placeholder="0"
            {...field}
            value={textValue}
            type="text"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        <Slider
          id="weth"
          max={wethBalance}
          defaultValue={defaultValue}
          step={0.01}
          value={wethValue ?? [0]}
          onValueChange={handleSliderChange}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="Weth"
        />
      </div>
    </div>
  );
}
