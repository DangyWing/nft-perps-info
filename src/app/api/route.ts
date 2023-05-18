import { NextResponse } from "next/server";

export function GET(request: Request) {
  console.log(request.url);
  const res = {
    foo: "bar",
    omar: request.url,
  };

  return NextResponse.json(res);
}
