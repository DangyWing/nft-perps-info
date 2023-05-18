import { NextResponse } from "next/server";

export function GET(_request: Request) {
  const res = {
    foo: "bar",
    baz: "qux",
  };

  return NextResponse.json(res);
}
