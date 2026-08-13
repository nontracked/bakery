import {MetadataRoute} from "next";

export default function robots():MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Правило для всех роботов (Google, Yandex, Bing)
      allow: '/',     // Разрешаем сканировать весь сайт
      disallow: [
        '/success',   // Запрещаем индексировать страницу чека
        '/checkout',  // Запрещаем индексировать процесс оформления
      ],
    },
    // Укажи здесь ссылку на свой будущий домен
    sitemap: 'https://m-e-bakery.vercel.app/sitemap.xml',
  }
}