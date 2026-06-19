import crypto from "crypto";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        {
          Success: false,
          Data: { Error: "Email is required" },
        },
        { status: 400 }
      );
    }

    // Check if user exists in the database
    const userRes = await query("SELECT id, name FROM users WHERE email = $1", [
      email,
    ]);

    if (userRes.rowCount === 0) {
      return Response.json(
        {
          Success: false,
          Data: { Error: "No account found with this email" },
        },
        { status: 404 }
      );
    }

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Token expires in 1 hour
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // Save reset token and expiration to the database
    await query(
      "UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3",
      [token, expires, email]
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    // Log the link in the terminal console for developers/testing
    console.log("\n==================================================");
    console.log("PASSWORD RESET REQUEST");
    console.log(`Email: ${email}`);
    console.log(`Reset Link: ${resetLink}`);
    console.log("==================================================\n");

    return Response.json({
      Success: true,
      Data: {
        message: "If an account with that email exists, we have sent password reset instructions.",
        resetLink, // returned to make development testing seamless
      },
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return Response.json(
      {
        Success: false,
        Data: { Error: error.message || "Failed to process forgot password request" },
      },
      { status: 500 }
    );
  }
}
