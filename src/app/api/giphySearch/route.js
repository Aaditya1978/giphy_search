import { NextResponse } from "next/server";

// api to get the giphy search results
export async function GET(req) {
  const searchTerm = await req.nextUrl.searchParams.get("searchTerm");
  const giphyResponse = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchTerm}&limit=100&rating=g`
  );
  const giphyData = await giphyResponse.json();
  return NextResponse.json({ data: giphyData.data }, { status: 200 });
}
