import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateSlug } from "@/lib/slug";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, authorName, content } = body as {
      password?: string;
      authorName?: string;
      content?: string;
    };

    if (!password || typeof password !== "string" || password.trim().length === 0) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const slug = generateSlug(10);
    const { error } = await supabase.from("letters").insert({
      slug,
      password: password.trim(),
      author_name: typeof authorName === "string" ? authorName.trim() : "",
      content: typeof content === "string" ? content : "",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create letter" },
        { status: 500 }
      );
    }

    return NextResponse.json({ slug });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
