import * as React from "react";
import { type SliderProps } from "@radix-ui/react-slider";
import { Slider } from "~/components/ui/slider";
import { Input } from "../../../ui/input";
import { type ControllerRenderProps } from "react-hook-form";

interface PercentageToCloseSelector {
  defaultValue: SliderProps["defaultValue"];
  field: ControllerRenderProps<
    {
      percentageToClose: number;
      slippage: number;
    },
    "percentageToClose"
  >;

  handleSliderChange: (value: number[]) => void;
  handleInputChange: (value: string) => void;
  textValue: string | undefined;
  percentageToCloseValue: number[] | undefined;
  defaultSliderToChangeValue: number;
}

export function PercentageToCloseSelector({
  field,
  handleSliderChange,
  handleInputChange,
  textValue,
  defaultSliderToChangeValue,
}: PercentageToCloseSelector) {
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
          id="ratioToClose"
          max={100}
          defaultValue={[defaultSliderToChangeValue]}
          step={5}
          // value={value ?? [0]}
          onValueChange={handleSliderChange}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="Percentage To Close"
        />
      </div>
    </div>
  );
}
