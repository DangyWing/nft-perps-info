import { NextResponse } from "next/server";

export function GET(
  _request: Request,
  {
    params,
  }: {
    params: {
      cat: string;
    };
  }
) {
  console.log(_request);
  console.log(params);
  const res = {
    foo: "bar",
    boop: params.cat,
  };

  return NextResponse.json(res);
}
