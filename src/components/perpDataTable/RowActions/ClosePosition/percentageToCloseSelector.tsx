"use client";

import * as React from "react";
import { type SliderProps } from "@radix-ui/react-slider";
import { useState } from "react";
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
}

export function PercentageToCloseSelector({
  defaultValue,
  field,
}: PercentageToCloseSelector) {
  const [value, setValue] = useState<number[] | undefined>(defaultValue);
  const [textValue, setTextValue] = useState<string | undefined>(
    defaultValue?.[0]?.toString() ?? "0"
  );

  const handleSliderChange = (value: number[]) => {
    if (!!value) {
      setValue(value);
      setTextValue(value[0]?.toString() ?? "0");
    }
  };

  const singlePeriodEnding = /^[0-9]\.$/;
  const endsWithNonNumber = /[^0-9]$/;

  const handleInputChange = (inputValue: string) => {
    if (!inputValue) {
      setValue([0]);
      setTextValue("");
      return;
    }

    const floatValue = parseFloat(inputValue);

    if (singlePeriodEnding.test(inputValue)) {
      setTextValue(inputValue);
      setValue([parseFloat(inputValue)]);
    } else if (endsWithNonNumber.test(inputValue)) {
      return;
    } else if (floatValue >= 0 && floatValue <= 100) {
      setTextValue(inputValue);
      setValue([floatValue]);
    }
  };

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
          defaultValue={value}
          step={5}
          value={value ?? [0]}
          onValueChange={handleSliderChange}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="Leverage"
        />
      </div>
    </div>
  );
}
