import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";

import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email: session.user.email }).select(
    "+password authProvider"
  );

  if (!user || user.authProvider !== "credentials") {
    return NextResponse.json(
      { message: "Password change not allowed" },
      { status: 400 }
    );
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password!);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Current password is incorrect" },
      { status: 401 }
    );
  }

  user.password = newPassword;
  await user.save();

  return NextResponse.json({
    message: "Password updated successfully",
  });
}
