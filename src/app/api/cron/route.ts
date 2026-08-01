import {clearOldCart} from "@/db/queries";
import {NextResponse} from "next/server";

export const GET = async (request: Request) => {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Access Denied', {status: 401})
  }
  await clearOldCart()
  return NextResponse.json({success: true, message: 'Cleaning complete'})
}