import { NextResponse } from "next/server";

export function GET(_request: Request) {
  console.log(_request);
  const res = {
    foo: "bar",
    omar: "dog",
  };

  return NextResponse.json(res);
}
