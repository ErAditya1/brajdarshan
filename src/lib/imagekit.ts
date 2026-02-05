import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT!,
});