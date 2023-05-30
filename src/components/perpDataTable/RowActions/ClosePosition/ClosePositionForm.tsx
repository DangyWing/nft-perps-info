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
import { type Address } from "viem";
import { ClosePositionDisplay } from "./ClosePositionDisplay";
import { useState } from "react";
import { PercentageToCloseSelector } from "./percentageToCloseSelector";

export function ClosePositionForm({
  ammName,
  ammAddress,
  walletAddress,
}: {
  ammName: string;
  ammAddress: Address;
  walletAddress: Address;
}) {
  const [slippageValue, setSlippageValue] = useState<number | string>(0.5);

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
      percentageToClose: 100,
      slippage: 0.5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
      <h4 className="font-medium leading-none">{`CLOSE ${ammName}`}</h4>
      <div className="grid gap-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 items-start gap-4">
            <FormField
              control={form.control}
              name="percentageToClose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="leverage">close %</FormLabel>
                  <FormControl>
                    <PercentageToCloseSelector
                      defaultValue={[100]}
                      field={field}
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
          <div>
            {/* @ts-expect-error Server Component */}
            <ClosePositionDisplay
              ammAddress={ammAddress}
              walletAddress={walletAddress}
              closePercent={form.watch("percentageToClose")}
            />
          </div>
          <Button type="submit">Close</Button>
        </form>
      </div>
    </Form>
  );
}
