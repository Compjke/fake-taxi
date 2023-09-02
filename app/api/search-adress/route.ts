import { NextResponse } from "next/server";

const base_url = "https://api.mapbox.com/search/searchbox/v1/suggest";
// 0012b8f4-e1ea-4c1b-82a2-ec947cb82739

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const searchText = searchParams.get("q");

  try {
    const res = await fetch(
      base_url +
        "?q=" +
        searchText +
        "?language=en&limit=8&session_token=0012b8f4-e1ea-4c1b-82a2-ec947cb82739&access_token=" +
        process.env.MAP_BOX_ACCES_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const searchRes = await res.json();
    return NextResponse.json(searchRes, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
