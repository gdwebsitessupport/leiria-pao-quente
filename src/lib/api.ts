import { NextResponse } from "next/server";

export function okJson<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorJson(message: string, status = 400, code = "ERROR") {
  return NextResponse.json({ error: { message, code } }, { status });
}
