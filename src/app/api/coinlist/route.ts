import coinList from "@/utils/coins.json";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const search = body.search;

  if (
    typeof coinList === "undefined" ||
    coinList.length === 0 ||
    search.length === 0
  ) {
    return NextResponse.json([]);
  }

  const results = coinList.filter((item: any) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
    );
  });

  return NextResponse.json(results);
}
