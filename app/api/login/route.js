import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3480";

    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const resJson = await response.json();

    if (!response.ok || !resJson.Success) {
      return NextResponse.json(
        {
          Success: false,
          Error: resJson.Data?.Error || "Invalid email or password.",
        },
        { status: response.status || 401 }
      );
    }

    // Set the authToken cookie in Next.js response
    const setCookie = response.headers.get("set-cookie");
    const cookieStore = await cookies();

    if (setCookie) {
      const match = setCookie.match(/authToken=([^;]+)/);
      if (match && match[1]) {
        const token = match[1];
        cookieStore.set("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
      }
    }

    return NextResponse.json({
      Success: true,
      Data: resJson.Data,
    });
  } catch (error) {
    console.error("Login route proxy error:", error);
    return NextResponse.json(
      { Success: false, Error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
