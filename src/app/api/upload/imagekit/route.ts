import { NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";
import UploadedImage from "@/models/UploadedImage";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

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
            folder: "/braj-darshan",
            useUniqueFileName: true,
        });
        

        const image = await UploadedImage.create({
            imageUrl:result.url,
            imageFileId:result.fileId,
            status: "temp",
            uploadedBy: session?.user.id,
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
