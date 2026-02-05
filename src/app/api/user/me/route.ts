import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

/* ================= GET CURRENT USER ================= */
export async function GET() {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await User.findOne({ email: session.user.email }).select(
    "-password"
  );

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}

/* ================= UPDATE PROFILE ================= */
export async function PATCH(req: NextRequest) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const allowedUpdates = {
    name: body.name,
    phone: body.phone,
    address: body.address,
    preferences: body.preferences,
  };

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: allowedUpdates },
    { new: true }
  ).select("-password");

  return NextResponse.json({
    message: "Profile updated successfully",
    user,
  });
}
