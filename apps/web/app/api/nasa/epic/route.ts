import { NextResponse } from "next/server";

/**
 * Fetches the latest NASA EPIC (Earth Polychromatic Imaging Camera) image.
 * Uses the NASA API key from env. Key is never exposed to the client.
 */
export async function GET() {
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "NASA_API_KEY not configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      `https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "NASA EPIC API request failed" },
        { status: 502 }
      );
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "No EPIC imagery available" },
        { status: 404 }
      );
    }

    const latest = data[0];
    const { image, date } = latest;
    const [year, month, day] = date.split("-");

    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image}.png`;

    return NextResponse.json({
      imageUrl,
      date,
      caption: latest.caption ?? `Earth from DSCOVR - ${date}`,
    });
  } catch (e) {
    console.error("NASA EPIC fetch error:", e);
    return NextResponse.json(
      { error: "Failed to fetch EPIC imagery" },
      { status: 500 }
    );
  }
}
