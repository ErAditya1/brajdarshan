import { getServerSession } from "next-auth";
import { authOptions } from "./auth";


export async function getCurrentUser() {
  
  try{
    const session = await getServerSession(authOptions)

    return session?.user ?? null;
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}
