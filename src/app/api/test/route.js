import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import cloudinary from "@/helper/cloudinary";

export async function POST(request) {
  // formData object
  const totalFormData = await request.formData();
  // getting the values sent from user
  const userName = totalFormData.get("userName");
  const userAvatar = totalFormData.get("userAvatar");

  if (!userName || !userAvatar) {
    return NextResponse.json({
      success: false,
      message: "Fill all the fields",
    });
  }

  const avatarByteData = await userAvatar.arrayBuffer();
  const avatarBuffer = Buffer.from(avatarByteData);
  const avatarPath = `./public/${userAvatar.name}`;
  await writeFile(avatarPath, avatarBuffer);

  const avatarUpload = await cloudinary.uploader.upload(avatarPath);

  if (avatarUpload) {
    console.log(avatarUpload);
  }

  return NextResponse.json({
    success: true,
    message: "api called",
  });
}
