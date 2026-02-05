import { NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";
import UploadedImage from "@/models/UploadedImage";
import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const formData = await req.formData();
        const file = formData.get("file") as File;

        
    const user = await getCurrentUser()

    if(!user ) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    console.log("user by current user", user)



        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await imagekit.upload({
            file: buffer,
            fileName: file.name,
            folder: "/braj-avatars",
            useUniqueFileName: true,
        });
        

        const image = await UploadedImage.create({
            imageUrl:result.url,
            imageFileId:result.fileId,
            status: "temp",
            uploadedBy: user.id,
        });

        return NextResponse.json({
            url: result.url,
            fileId:result.fileId,
            width: result.width,
            height: result.height,
            size: result.size,
        });
    } catch (err) {
        console.error("Image upload failed:", err);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}
