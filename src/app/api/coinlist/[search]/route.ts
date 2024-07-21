import coinList from "@/utils/coins.json";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  if (typeof coinList === "undefined" || coinList.length === 0) {
    return NextResponse.json({});
  }

  const results = coinList.find((item: any) => {
    return (
      item.name.toLowerCase() === params.search.toLowerCase() ||
      item.id.toLowerCase() === params.search.toLowerCase()
    );
  });

  return NextResponse.json(results ? results : {});
}
