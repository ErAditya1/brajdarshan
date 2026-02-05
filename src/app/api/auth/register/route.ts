import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, email, password, role, adminKey ,phone } = body;

    /* ---------------- Validation ---------------- */
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    /* ---------------- Existing user ---------------- */
    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Email or phone already registered" },
        { status: 409 }
      );
    }

    

    if (role === "admin") {
      // 🔐 VERY IMPORTANT: protect admin signup
      if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return NextResponse.json(
          { success: false, message: "Invalid admin secret key" },
          { status: 403 }
        );
      }
   
    }

   

    /* ---------------- Create user ---------------- */
    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      authProvider: "credentials",
      isVerified: false,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to register user" },
      { status: 500 }
    );
  }
}
