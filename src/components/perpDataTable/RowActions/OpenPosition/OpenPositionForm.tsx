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
import { type Address, useAccount, erc20ABI } from "wagmi";
import { getMaxLeverageFromContractAddress } from "~/utils/fetchFromConstant/getMaxLeverageFromContractAddress";
import { formatEther } from "viem";
import { useContractRead } from "wagmi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOpenPositionSummary } from "~/app/lib/getOpenPositionSummary";
import { getNftPerpAmmNameFromContractAddress } from "~/utils/fetchFromConstant/getNftPerpAmmNameFromContractAddress";
import { OpenPositionDisplay } from "./OpenPositionDisplay";
import { Slinput } from "~/components/Slinput/Slinput";
import { OpenPositionTx } from "./OpenPositionTx";

const defaultWethValue = 0.01;

export function OpenPositionForm({
  ammName,
  ammAddress,
  side,
  walletAddress,
}: {
  ammName: string;
  ammAddress: Address;
  side: "long" | "short";
  walletAddress: Address;
}) {
  const { address } = useAccount();
  const WETH_CONTRACT = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
  const maxLeverage = getMaxLeverageFromContractAddress(ammAddress);
  const [slippageValue, setSlippageValue] = useState<number | string>(0.5);
  const [leverageValue, setLeverageValue] = useState<number[] | undefined>([
    maxLeverage,
  ]);
  const [sliderTextValue, setSliderTextValue] = useState<string | undefined>(
    maxLeverage.toString()
  );
  const [wethValue, setWethValue] = useState<number>(defaultWethValue);
  const [wethSliderValue, setWethSliderValue] = useState<number[]>([
    defaultWethValue,
  ]);
  const [wethTextValue, setWethTextValue] = useState<string | undefined>(
    defaultWethValue.toString()
  );

  const [sliderValue, setSliderValue] = useState<number[]>([maxLeverage]);

  const { data, isLoading, isError } = useContractRead({
    address: WETH_CONTRACT,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [address ?? "0x0"],
    enabled: !!address,
  });

  const wethBalance = !isError && !isLoading && !!data ? data : BigInt(0);

  const formSchema = z.object({
    weth: z.union([
      z.string().endsWith("."),
      z
        .number()
        .positive()
        .lte(parseFloat(formatEther(wethBalance))),
    ]),
    leverage: z.number().positive().lte(maxLeverage, "leverage too high"),
    slippage: z.number().positive().lt(50, "slippage must be less than 50%"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      weth: parseFloat(formatEther(wethBalance)),
      leverage: maxLeverage,
      slippage: 0.5,
    },
  });

  const nftPerpAmmName = getNftPerpAmmNameFromContractAddress(ammAddress);
  const leverageValueParsed = leverageValue?.[0];

  const enableOpenPositionSummaryQuery =
    !!nftPerpAmmName &&
    !!walletAddress &&
    !!leverageValueParsed &&
    !!side &&
    wethValue > 0 &&
    wethValue <= parseFloat(formatEther(wethBalance));

  const {
    data: openPositionData,
    isError: openPositionError,
    isFetched,
    isInitialLoading,
    isRefetching,
  } = useQuery({
    queryKey: [
      "openPositionSummary",
      { nftPerpAmmName, walletAddress, wethValue, leverageValueParsed, side },
    ],
    refetchInterval: 60_000,
    queryFn: () =>
      getOpenPositionSummary({
        ammName: nftPerpAmmName,
        walletAddress,
        notionalAmount: wethValue,
        leverage: leverageValueParsed ?? 0,
        side: side === "long" ? "BUY" : "SELL",
      }),
    enabled: enableOpenPositionSummaryQuery,
  });

  const isLoadingPositionSummary = isInitialLoading || isRefetching;

  const wethBalanceFloat =
    Math.floor(parseFloat(formatEther(wethBalance)) * 1000) / 1000;

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

  const handleSliderChange = (value: (string | number)[]) => {
    if (!!value && isNumberArray(value)) {
      setSliderValue(value);
      setSliderTextValue(value[0]?.toString() ?? "0");
    }
  };

  const handleSliderCommit = (value: (string | number)[]) => {
    if (!!value && isNumberArray(value)) {
      setLeverageValue(value);
      setSliderValue(value);
      setSliderTextValue(value[0]?.toString() ?? "0");
    }
  };

  const handleSliderInputChange = (inputValue: string) => {
    if (!inputValue) {
      setSliderTextValue("");
      setLeverageValue([0]);
      setSliderValue([0]);
      return;
    }

    const floatValue = parseFloat(inputValue);

    if (singlePeriodEnding.test(inputValue)) {
      setSliderTextValue(inputValue);
      setSliderValue([parseFloat(inputValue)]);
      setLeverageValue([parseFloat(inputValue)]);
    } else if (endsWithNonNumber.test(inputValue)) {
      return;
    } else if (floatValue >= 0 && floatValue <= 100) {
      setSliderTextValue(inputValue);
      setSliderValue([floatValue]);
      setLeverageValue([floatValue]);
    }
  };

  function isNumberArray(value: unknown[]): value is number[] {
    return value.every((item) => typeof item === "number");
  }

  function handleWethSliderChange(value: (string | number)[]) {
    if (!!value && isNumberArray(value)) {
      setWethSliderValue(value);
      setWethTextValue(value[0]?.toString() ?? "0");
    }
  }

  const handleWethSliderCommit = (value: (string | number)[]) => {
    if (!!value && isNumberArray(value)) {
      setWethValue(value?.[0] ?? 0);
      setWethSliderValue(value);
      setWethTextValue(value[0]?.toString() ?? "0");
    }
  };

  const handleWethInputChange = (inputValue: string) => {
    if (!inputValue) {
      setWethTextValue("");
      setWethValue(0);
      setWethSliderValue([0]);
      return;
    }

    const floatValue = parseFloat(inputValue);

    if (singlePeriodEnding.test(inputValue)) {
      console.log(inputValue);
      // setTextValue(inputValue);
      setSliderValue([floatValue]);
      setWethValue(floatValue);
      setWethTextValue(inputValue);
    } else if (endsWithNonNumber.test(inputValue)) {
      return;
    } else if (floatValue >= 0 && floatValue <= wethBalanceFloat) {
      setWethTextValue(inputValue);
      setWethSliderValue([floatValue]);
      setWethValue(floatValue);
    }
  };

  const outputSize = openPositionData?.data?.outputSize;

  if (!leverageValueParsed) return <div>Invalid leverage selected</div>;

  const { write, error, dataWaitForTx } = OpenPositionTx({
    ammAddress,
    wethAmount: wethValue,
    slippage: slippageValue,
    leverage: leverageValueParsed,
    side,
    walletAddress,
    outputSize: outputSize as `${number}` | undefined,
  });

  function onSubmit() {
    write?.();
  }

  return (
    <Form {...form}>
      <h4 className="font-medium leading-none">{`${side.toLocaleUpperCase()} ${ammName}`}</h4>
      <div className="grid gap-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="weth"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="weth">weth</FormLabel>
                <FormControl>
                  <Slinput
                    defaultValue={[0.01]}
                    handleInputChange={handleWethInputChange}
                    handleSliderChange={handleWethSliderChange}
                    handleSliderCommit={handleWethSliderCommit}
                    textValue={wethTextValue}
                    label="Weth"
                    max={wethBalanceFloat}
                    sliderValue={wethSliderValue}
                    sliderStep={0.01}
                    placeholder="0.01"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 items-start gap-4">
            <FormField
              control={form.control}
              name="leverage"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="leverage">leverage</FormLabel>
                  <FormControl>
                    <Slinput
                      label="Leverage"
                      max={maxLeverage}
                      placeholder="0"
                      sliderStep={0.01}
                      defaultValue={[maxLeverage]}
                      handleInputChange={handleSliderInputChange}
                      handleSliderChange={handleSliderChange}
                      handleSliderCommit={handleSliderCommit}
                      textValue={sliderTextValue}
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
          </div>
          <OpenPositionDisplay
            openPositionData={openPositionData}
            isError={openPositionError}
            isFetched={isFetched}
            isLoading={isLoadingPositionSummary}
            enabled={enableOpenPositionSummaryQuery}
            dataWaitForTx={dataWaitForTx}
          />
          <Button
            type="submit"
            disabled={!write || !!error}
            className="rounded-none bg-primary-foreground text-primary hover:border hover:border-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            {side}
          </Button>
        </form>
      </div>
    </Form>
  );
}
