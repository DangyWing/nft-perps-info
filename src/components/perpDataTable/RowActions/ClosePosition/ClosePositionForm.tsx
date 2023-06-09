"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ClosePositionDisplay } from "./ClosePositionDisplay";
import { useState } from "react";
import { PercentageToCloseSelector } from "./percentageToCloseSelector";
import { useQuery } from "@tanstack/react-query";
import { getClosePositionSummary } from "~/app/lib/getClosePositionSummary";
import { ClosePositionTx } from "./ClosePositionTx";
import { type Address } from "viem";
import { getNftPerpAmmNameFromContractAddress } from "~/utils/fetchFromConstant/getNftPerpAmmNameFromContractAddress";

const percentageToCloseDefaultValue = 100;

export function ClosePositionForm({
  ammName,
  ammAddress,
  walletAddress,
  side,
}: {
  ammName: string;
  ammAddress: Address;
  walletAddress: Address;
  side: "long" | "short";
}) {
  const [slippageValue, setSlippageValue] = useState<number | string>(0.5);

  const [percentageToCloseValue, setPercentageToCloseValue] = useState<
    number[] | undefined
  >([percentageToCloseDefaultValue]);

  const [textValue, setTextValue] = useState<string | undefined>(
    percentageToCloseDefaultValue.toString()
  );
  const [sliderValue, setSliderValue] = useState<number[]>([
    percentageToCloseDefaultValue,
  ]);

  const formSchema = z.object({
    percentageToClose: z
      .number()
      .positive()
      .lte(100, "Can't close more than 100%"),
    slippage: z.number().positive().lt(50, "slippage must be less than 50%"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      percentageToClose: percentageToCloseDefaultValue,
      slippage: 0.5,
    },
  });

  const singlePeriodEnding = /^[0-9]\.$/;
  const endsWithNonNumber = /[^0-9]$/;

  const handleSlippageChange = (inputValue: string) => {
    if (!inputValue) {
      setSlippageValue("");
    }
    const floatValue = parseFloat(inputValue);

    if (singlePeriodEnding.test(inputValue)) {
      setSlippageValue(inputValue);
    } else if (endsWithNonNumber.test(inputValue)) {
      return;
    } else if (floatValue >= 0 && floatValue < 50) {
      setSlippageValue(floatValue);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (!!value) {
      setSliderValue(value);
      setTextValue(value[0]?.toString() ?? "0");
    }
  };

  const handleSliderCommit = (value: number[]) => {
    if (!!value) {
      setPercentageToCloseValue(value);
      setSliderValue(value);
      setTextValue(value[0]?.toString() ?? "0");
    }
  };

  const handleInputChange = (inputValue: string) => {
    if (!inputValue) {
      setTextValue("");
      setPercentageToCloseValue([0]);
      setSliderValue([0]);
      return;
    }

    const floatValue = parseFloat(inputValue);

    if (singlePeriodEnding.test(inputValue)) {
      setTextValue(inputValue);
      setSliderValue([parseFloat(inputValue)]);
      setPercentageToCloseValue([parseFloat(inputValue)]);
    } else if (endsWithNonNumber.test(inputValue)) {
      return;
    } else if (floatValue >= 0 && floatValue <= 100) {
      setTextValue(inputValue);
      setSliderValue([floatValue]);
      setPercentageToCloseValue([floatValue]);
    }
  };

  const percentageToCloseClean = percentageToCloseValue?.[0] ?? 0;

  const nftPerpAmmName = getNftPerpAmmNameFromContractAddress(ammAddress);

  const {
    data: closePositionData,
    isError,
    isFetched,
    isLoading: isLoadingClosePosition,
  } = useQuery({
    queryKey: [
      "closePositionSummary",
      { nftPerpAmmName, walletAddress, percentageToCloseClean },
    ],
    refetchInterval: 60_000,
    queryFn: () =>
      getClosePositionSummary({
        ammName: nftPerpAmmName,
        walletAddress,
        closePercent: percentageToCloseClean,
      }),
    enabled: !!percentageToCloseClean && !!walletAddress && !!nftPerpAmmName,
  });

  const { write, error } = ClosePositionTx({
    ammAddress,
    outputNotional: closePositionData?.data.outputNotional,
    slippage: slippageValue,
    percentToClose: percentageToCloseClean,
    walletAddress: walletAddress,
    side: side,
  });

  function onSubmit() {
    write?.();
  }

  return (
    <Form {...form}>
      <h4 className="font-medium leading-none">{`CLOSE ${ammName}`}</h4>
      <div className="grid gap-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* <div className="grid grid-cols-2 items-start gap-4"> */}
          <FormField
            control={form.control}
            name="percentageToClose"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="leverage">close (%)</FormLabel>
                <FormControl>
                  <PercentageToCloseSelector
                    defaultValue={[100]}
                    field={field}
                    handleInputChange={handleInputChange}
                    handleSliderChange={handleSliderChange}
                    handleSliderCommit={handleSliderCommit}
                    textValue={textValue}
                    percentageToCloseValue={percentageToCloseValue}
                    defaultSliderToChangeValue={percentageToCloseDefaultValue}
                    sliderValue={sliderValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slippage"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="slippage">slippage (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0.5"
                    {...field}
                    onChange={(e) => handleSlippageChange(e.target.value)}
                    value={slippageValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* </div> */}
          {/* @ts-expect-error Server Component */}
          <ClosePositionDisplay
            closePositionData={closePositionData}
            isLoading={isLoadingClosePosition}
            isError={isError}
            isFetched={isFetched}
          />
          <Button
            type="submit"
            disabled={!write || !!error}
            className="rounded-none bg-primary-foreground text-primary hover:border hover:border-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            Close
          </Button>
        </form>
      </div>
    </Form>
  );
}
