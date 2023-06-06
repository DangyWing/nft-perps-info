import * as React from "react";
import { type SliderProps } from "@radix-ui/react-slider";
import { Slider } from "~/components/ui/slider";
import { Input } from "~/components/ui/input";
import { type ControllerRenderProps } from "react-hook-form";

interface LeverageSelectorProps {
  defaultValue: SliderProps["defaultValue"];
  maxLeverage: number;
  field: ControllerRenderProps<
    {
      weth: number | string;
      leverage: number;
      slippage: number;
    },
    "leverage"
  >;
  handleSliderChange: (value: number[]) => void;
  handleSliderCommit: (value: number[]) => void;
  handleInputChange: (value: string) => void;
  textValue: string | undefined;
  sliderValue: number[] | undefined;
  leverageValue: number[] | undefined;
  defaultSliderToChangeValue: number;
}

export function LeverageSelector({
  field,
  handleSliderChange,
  handleSliderCommit,
  handleInputChange,
  textValue,
  sliderValue,
  maxLeverage,
}: LeverageSelectorProps) {
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
          id="leverage"
          max={maxLeverage}
          defaultValue={[maxLeverage]}
          step={0.01}
          onValueCommit={handleSliderCommit}
          onValueChange={handleSliderChange}
          value={sliderValue}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="Leverage"
        />
      </div>
    </div>
  );
}
