import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password, batch } = await req.json();
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3480";

    const response = await fetch(`${backendUrl}/auth/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        batch,
      }),
    });

    const resJson = await response.json();

    if (!response.ok || !resJson.Success) {
      return NextResponse.json(
        {
          Success: false,
          Error: resJson.Data?.Error || "Registration failed. Please try again.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      Success: true,
      Data: resJson.Data,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { Success: false, Error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
