import { NextRequest, NextResponse } from "next/server";

const DICICILAJA_BASE = "https://prod.dicicilaja.com/v3/simulation/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let url: string;

  if (type === "brands") {
    const typeNum = searchParams.get("typeNum");
    const jaminanType = searchParams.get("jaminanType");
    if (!typeNum || !jaminanType) return NextResponse.json({ error: "Missing params" }, { status: 400 });
    url = `${DICICILAJA_BASE}/tipeobjek/${typeNum}/${jaminanType}`;
  } else if (type === "models") {
    const brandId = searchParams.get("brandId");
    const jaminanType = searchParams.get("jaminanType");
    if (!brandId || !jaminanType) return NextResponse.json({ error: "Missing params" }, { status: 400 });
    url = `${DICICILAJA_BASE}/objekbrand/${brandId}/${jaminanType}`;
  } else if (type === "years") {
    const modelId = searchParams.get("modelId");
    const areaId = searchParams.get("areaId");
    if (!modelId || !areaId) return NextResponse.json({ error: "Missing params" }, { status: 400 });
    url = `${DICICILAJA_BASE}/tahunkendaraan/${modelId}/${areaId}`;
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${DICICILAJA_BASE}/simulasi/hitung-semua-tenor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  } catch {
    return NextResponse.json({ error: "Failed to calculate" }, { status: 500 });
  }
}
