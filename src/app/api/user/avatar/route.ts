import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";
import UploadedImage from "@/models/UploadedImage";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function PATCH(req: Request) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { avatar } = await req.json();


  const use = await getCurrentUser()
  

  const res= await User.findOne({email:session.user.email}).lean()


  if(res?.avatar){
    await UploadedImage.findOneAndUpdate(
          { imageFileId: res?.avatar?.imageFileId },
          {  status: "temp" },
        );
  }

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { avatar },
    { new: true }
  );

  await UploadedImage.findOneAndUpdate(
          { imageFileId: avatar.imageFileId },
          {  status: "published" },
        );
        

  return NextResponse.json({ avatar: user?.avatar });
}
