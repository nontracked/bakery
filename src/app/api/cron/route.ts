import {clearOldCart} from "@/db/queries";
import {NextResponse} from "next/server";

export const GET = async (request: Request) => {
  const authHeader = request.headers.get('authorization') //  Достаем заголовок авторизации из запроса
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) { // Если кто-то чужой — отшиваем со статусом 401 (Unauthorized)
    return new Response('Access Denied', {status: 401})
  }
  await clearOldCart() // Если пароль верный — запускаем очистку
  return NextResponse.json({success: true, message: 'Cleaning complete'}) // Рапортуем об успехе
}