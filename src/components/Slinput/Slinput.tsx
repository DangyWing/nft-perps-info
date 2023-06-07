import { type SliderProps } from "@radix-ui/react-slider";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";

export type SlinputProps = {
  defaultValue: SliderProps["defaultValue"];

  handleSliderChange: (value: (string | number)[]) => void;
  handleSliderCommit: (value: (string | number)[]) => void;
  handleInputChange: (value: string) => void;
  textValue: string | undefined;
  sliderValue: number[] | undefined;
  max: number;
  label: string;
  sliderStep: number;
  placeholder: string;
};

export const Slinput = ({
  handleSliderChange,
  handleSliderCommit,
  handleInputChange,
  textValue,
  sliderValue,
  max,
  label,
  sliderStep,
  placeholder,
}: SlinputProps) => {
  return (
    <div className="grid gap-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Input
            placeholder={placeholder}
            value={textValue}
            type="text"
            onChange={(e: { target: { value: string } }) =>
              handleInputChange(e.target.value)
            }
          />
        </div>
        <Slider
          max={max}
          step={sliderStep}
          onValueCommit={handleSliderCommit}
          onValueChange={handleSliderChange}
          value={sliderValue}
          className="accent-red-400 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label={label}
        />
      </div>
    </div>
  );
};
