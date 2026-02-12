import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";

  const { data, error } = await supabase
    .from("letters")
    .select("password, content, author_name")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  if (normalize(data.password) !== normalize(password)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    content: data.content ?? "",
    authorName: data.author_name ?? "",
  });
}
