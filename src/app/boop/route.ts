import { NextResponse } from "next/server";

export function GET(request: Request) {
  console.log(request.url);
  // const { searchParams } = new URL(request.url);

  // console.log(searchParams);

  // const cat = searchParams.get("cat");

  const res = {
    foo: "bar",
    // boop: cat,
  };

  return NextResponse.json(res);
}
