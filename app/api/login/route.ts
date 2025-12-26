import { login } from "@/services/authService";
import { NextResponse } from "next/server";
// Route is not needed in this case but Im using it to practice how it works
export async function POST(req: Request) {
  const body = await req.json();

  const backendRes = await login(body);

  if (!backendRes.ok) {
    const errorData = await backendRes
      .json()
      .catch(() => ({ error: "Invalid credentials" }));
    return NextResponse.json(
      { error: errorData.error || "Invalid credentials" },
      { status: backendRes.status },
    );
  }

  return NextResponse.json({ ok: true });
}
