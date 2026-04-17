import { NextResponse } from "next/server";
import { getBranches } from "../../lib/api";
import { SITE_URL } from "../../lib/constants";

// IndexNow key — harus identik dengan isi file /public/a3f7c2e9d1b8f4a6c3e5d9b2a7f1c8e4.txt
const INDEXNOW_KEY = "a3f7c2e9d1b8f4a6c3e5d9b2a7f1c8e4";

// api.indexnow.org mendistribusikan ke semua search engine peserta:
// Bing, Yandex, Naver, Seznam, Yep — satu POST, semua engine notified
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function GET(request: Request) {
  // Proteksi endpoint dengan secret — cegah abuse / spam ke IndexNow API
  const secret = new URL(request.url).searchParams.get("secret");

  if (!process.env.INDEXNOW_SECRET || secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ambil semua slug cabang dari API
  const branches = await getBranches();

  // Bangun daftar semua URL yang perlu disubmit ke IndexNow
  const urls: string[] = [
    `${SITE_URL}/`,
    `${SITE_URL}/cabang`,
    ...branches.map((b) => `${SITE_URL}/cabang/${b.slug}`),
  ];

  const hostname = new URL(SITE_URL).hostname;

  const payload = {
    host: hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  let indexnowResponse: Response;
  try {
    indexnowResponse = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reach IndexNow API", detail: String(err) },
      { status: 502 }
    );
  }

  // IndexNow mengembalikan 200 (OK) atau 202 (Accepted) jika sukses
  const success = indexnowResponse.status === 200 || indexnowResponse.status === 202;

  return NextResponse.json(
    {
      success,
      indexnow_status: indexnowResponse.status,
      submitted_count: urls.length,
      key: INDEXNOW_KEY,
      urls,
    },
    { status: success ? 200 : 500 }
  );
}
