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
import { Button } from "../../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type Address, useAccount, erc20ABI } from "wagmi";
import { getMaxLeverageFromContractAddress } from "~/utils/fetchFromConstant/getMaxLeverageFromContractAddress";
import { formatEther } from "viem";
import { useContractRead } from "wagmi";
import { WethSelector } from "./wethSelector";
import { useState } from "react";
import { LeverageSelector } from "./leverageSelector";

export function OpenPositionForm({
  ammName,
  ammAddress,
  positionType,
}: {
  ammName: string;
  ammAddress: Address;
  positionType: "long" | "short";
}) {
  const { address } = useAccount();
  const WETH_CONTRACT = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
  const maxLeverage = getMaxLeverageFromContractAddress(ammAddress);

  const [slippageValue, setSlippageValue] = useState<number | string>(0.5);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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

  return (
    <Form {...form}>
      <h4 className="font-medium leading-none">{`${positionType.toLocaleUpperCase()} ${ammName}`}</h4>
      <div className="grid gap-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="weth"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="weth">weth</FormLabel>
                <FormControl>
                  <WethSelector
                    wethBalance={wethBalanceFloat}
                    defaultValue={[wethBalanceFloat]}
                    field={field}
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="leverage">leverage</FormLabel>
                  <FormControl>
                    <LeverageSelector
                      maxLeverage={maxLeverage}
                      field={field}
                      defaultValue={[maxLeverage]}
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
          <Button type="submit">Long</Button>
        </form>
      </div>
    </Form>
  );
}
