// Not in Node env
import { NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  const url = req.nextUrl.clone();

  if (signedinPages.find((p) => p === url.pathname)) {
    const token = req.cookies.SPOTIFY_ACCESS_TOKEN;

    if (!token) {
      url.pathname = "/signin";
      return NextResponse.rewrite(url);
    }
  }
}
